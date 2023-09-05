import { createContext, useContext, useState, useRef, RefObject } from 'react'
import { useUserAxiosContext } from './UserAxiosContext'
import { AxiosResponse } from 'axios'
import type { User } from "../context/UserAxiosContext"
import { socket } from '../socket/socket'
import { format } from 'date-fns'

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
  timeSent?: string,
}

type ChatContext = {
  isCreating: boolean,
  isSending: boolean,
  getChatRoom: (senderId: string | undefined, receiverId: string | undefined) => Promise<void>,
  selectedUser: User | undefined,
  setSelectedUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  createMessage: (messageContent: string, senderId: string, receiverId: string) => Promise<void>,
  chatErrors: AxiosResponse<unknown, unknown>[] | [],
  setChatErrors: React.Dispatch<React.SetStateAction<AxiosResponse<unknown, unknown>[]>>,
  chatScroll: RefObject<HTMLDivElement>,
  messages: Message[] | [],
  setMessages: React.Dispatch<React.SetStateAction<Message[] | []>>,
}

const StateContext = createContext<ChatContext | null>(null)

export default function ChatContext({ children }: { children: React.ReactNode }) {
  const { userAxios } = useUserAxiosContext()
  const [selectedUser, setSelectedUser] = useState<User | undefined>()
  const [chatErrors, setChatErrors] = useState<AxiosResponse[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [chatRoom, setChatRoom] = useState<Chat>({
    _id: '',
    senderId: '',
    receiverId: ''
  });
  const chatScroll = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const getChatRoom = async (senderId: string | undefined, receiverId: string | undefined) => {
    setMessages(() => [])
    setIsCreating(true)
    await userAxios.post('/chat-rooms', {
      senderId, receiverId
    }).then(async (res: AxiosResponse) => {
      setChatRoom(res.data?.chatRoom)
      setMessages(res.data?.messages)
    }).catch(err => {
      const { response } = err
      setChatErrors([response?.data, ...chatErrors])
    })
    setIsCreating(false)
  }

  const createMessage = async (messageContent: string, senderId: string, receiverId: string) => {
    setIsSending(true)
    const newMessage: Message = {
      messageContent,
      senderId,
      receiverId,
      chatRoomId: chatRoom?._id,
      timeSent: format(new Date(), 'yyyy/MM/dd HH:mm:ss'),
    }

    setMessages((prevMessages) => [...prevMessages, newMessage])
    await userAxios.post('/messages', newMessage).then(() => {
      socket.emit("send_message", newMessage)
    }).catch(err => {
      console.log(err)
    })
    setIsSending(false)
  }
  return (
    <StateContext.Provider value={{
      messages,
      setMessages,
      chatScroll,
      isCreating,
      isSending,
      getChatRoom, selectedUser, setSelectedUser, createMessage, chatErrors, setChatErrors
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
