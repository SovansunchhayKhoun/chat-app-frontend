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
  chatRoomId: string,
  senderId: string,
  receiverId: string,
  isRead?: boolean,
  timeSent?: string
}

type ChatContext = {
  isCreating: boolean,
  chatRoomMessagesIsLoading: boolean,
  getChatRoom: (senderId: string | undefined, receiverId: string | undefined) => Promise<void>,
  selectedUser: User | undefined,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  createChatRoom: (selectedUser: User) => Promise<void>,
  createMessage: (messageContent: string | undefined, senderId: string | undefined, receiverId: string | undefined) => Promise<void>,
  chatErrors: AxiosResponse<unknown, unknown>[] | [],
  setChatErrors: React.Dispatch<React.SetStateAction<AxiosResponse<unknown, unknown>[]>>,
  chatMessages: Message[] | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chatRoomMessagesRefetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
}

const StateContext = createContext<ChatContext | null>(null)

export default function ChatContext({ children }: { children: React.ReactNode }) {
  const { userAxios, user } = useUserAxiosContext()
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [chatErrors, setChatErrors] = useState<AxiosResponse[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [chatRoom, setChatRoom] = useState<Chat>();

  const { data: chatMessages, isLoading: chatRoomMessagesIsLoading, refetch: chatRoomMessagesRefetch } = useQuery(['messages', chatRoom?._id], () => {
    if (chatRoom?._id) {
      return userAxios.get(`/api/chat-messages/${chatRoom?._id}`).then(({ data }: AxiosResponse) => {
        return data?.messages
      }).catch(error => {
        const { response } = error
        setChatErrors([response?.data])
        console.log(error)
      })
    }
  })
  
  const getChatRoom = async (senderId: string | undefined, receiverId: string | undefined) => {
    await userAxios.post('/api/chat-room', {
      senderId, receiverId
    }).then(async (res: AxiosResponse) => {
      setChatRoom(res.data?.chatRoom)
    }).catch(err => {
      const { response } = err
      setChatErrors([response?.data, ...chatErrors])
    })
  }

  const createChatRoom = async (selectedUser: User) => {
    setIsCreating(true)
    await userAxios.post('/api/chat-rooms', {
      senderId: user?._id,
      receiverId: selectedUser._id
    }).then(() => {
      getChatRoom(selectedUser?._id, user?._id)
    }).catch(e => {
      // console.log(e)
      setChatErrors([e.response.data])
    })
    setIsCreating(false)
  }

  const createMessage = async (messageContent: string | undefined, senderId: string | undefined, receiverId: string | undefined) => {
    setIsCreating(true)
    const newMessage = {
      messageContent,
      senderId,
      receiverId,
      chatRoomId: chatRoom?._id,
    }
    await userAxios.post('/api/messages', newMessage).then(async () => {
      await chatRoomMessagesRefetch()
      socket().emit("send_message", newMessage)
    }).catch(err => {
      console.log(err)
    })
    setIsCreating(false)
  }
  return (
    <StateContext.Provider value={{ isCreating, chatMessages, chatRoomMessagesIsLoading, chatRoomMessagesRefetch, getChatRoom, selectedUser, setSelectedUser, createChatRoom, createMessage, chatErrors, setChatErrors }}>
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
