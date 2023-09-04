import { createContext, useContext, useState } from 'react'
import { useUserAxiosContext } from './UserAxiosContext'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import type { User } from "../context/UserAxiosContext"
import { socket } from '../socket/socket'

socket()

export type Chat = {
  _id: string,
  senderId: string,
  receiverId: string
}

export type Message = {
  _id?: string,
  messageContent: string,
  chatRoomId: string | undefined,
  senderId: string,
  receiverId: string,
  isRead?: boolean,
  timeSent?: string
}

type ChatContext = {
  isCreating: boolean,
  getChatRoom: (senderId: string | undefined, receiverId: string | undefined) => Promise<void>,
  selectedUser: User | undefined,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  createMessage: (messageContent: string, senderId: string, receiverId: string) => Promise<void>,
  chatErrors: AxiosResponse<unknown, unknown>[] | [],
  setChatErrors: React.Dispatch<React.SetStateAction<AxiosResponse<unknown, unknown>[]>>,
  chatRoomMessagesIsLoading: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chatRoomMessagesRefetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
  messages: Message[] | [],
  setMessages: React.Dispatch<React.SetStateAction<Message[] | []>>
}

const StateContext = createContext<ChatContext | null>(null)

export default function ChatContext({ children }: { children: React.ReactNode }) {
  const { userAxios } = useUserAxiosContext()
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [chatErrors, setChatErrors] = useState<AxiosResponse[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [chatRoom, setChatRoom] = useState<Chat>({
    _id: '',
    senderId: '',
    receiverId: ''
  });
  const [messages, setMessages] = useState<Message[]>([])

  const { isLoading: chatRoomMessagesIsLoading, refetch: chatRoomMessagesRefetch } = useQuery(
    ['chatQuery', chatRoom._id], async () => {
      if (chatRoom?._id === '') return []
      if (chatRoom?._id !== '') {
        return userAxios.get(`/chat-messages/${chatRoom?._id}`).then(({ data }: AxiosResponse) => {
          setMessages(data?.messages)
        }).catch(error => {
          const { response } = error
          setChatErrors([response?.data])
          console.log(error)
        })
      }
    }
  )

  const getChatRoom = async (senderId: string | undefined, receiverId: string | undefined) => {
    await userAxios.post('/chat-rooms', {
      senderId, receiverId
    }).then(async (res: AxiosResponse) => {
      setChatRoom(res.data?.chatRoom)
      setMessages(res.data?.messages)
    }).catch(err => {
      const { response } = err
      setChatErrors([response?.data, ...chatErrors])
    })
  }

  const createMessage = async (messageContent: string, senderId: string, receiverId: string) => {
    setIsCreating(true)
    const newMessage: Message = {
      messageContent,
      senderId,
      receiverId,
      chatRoomId: chatRoom?._id,
    }
    await userAxios.post('/messages', newMessage).then(async () => {
      setMessages([...messages, newMessage])
      socket().emit("send_message", newMessage)
    }).catch(err => {
      console.log(err)
    })
    setIsCreating(false)
  }
  return (
    <StateContext.Provider value={{
      chatRoomMessagesIsLoading,
      chatRoomMessagesRefetch,
      isCreating,
      messages,
      setMessages, getChatRoom, selectedUser, setSelectedUser, createMessage, chatErrors, setChatErrors
    }}>
      {children}
    </StateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useChatContext = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error("useChatContext cannot be used outside of ChatContextProvider")
  }
  return context
}
