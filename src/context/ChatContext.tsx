import React, { createContext, useContext, useState } from 'react'
import { useUserAxiosContext } from './UserAxiosContext'
import { useQuery } from '@tanstack/react-query'

const StateContext = createContext(null)

export default function ChatContext({ children }) {
  const [selectedUser, setSelectedUser] = useState({})
  const { userAxios, user } = useUserAxiosContext()
  const [chatErrors, setChatErrors] = useState<[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [chatRoom, setChatRoom] = useState<object>({});

  const { data: chatRoomMessages, isLoading: chatRoomMessagesIsLoading, refetch: chatRoomMessagesRefetch } = useQuery(['messages', chatRoom._id], () => {
    if (chatRoom._id) {
      return userAxios.get(`/api/chat-messages/${chatRoom._id}`).then(({ data }) => {
        return data.messages
      }).catch(e => {
        const { response } = e
        setChatErrors([response.data])
        console.log(e)
      })
    }
  })

  const getChatRoom = async (senderId, receiverId) => {
    await userAxios.post('/api/chat-room', {
      senderId, receiverId
    }).then(async (res) => {
      setChatRoom(res.data.chatRoom)
    }).catch(err => {
      const { response } = err
      setChatErrors(response.data)
    })
  }

  const createChatRoom = async (selectedUser) => {
    setIsCreating(true)
    await userAxios.post('/api/chat-rooms', {
      senderId: user._id,
      receiverId: selectedUser._id
    }).then((res) => {
      getChatRoom(selectedUser._id, user._id)
    }).catch(e => {
      // console.log(e)
      setChatErrors([e.response.data])
    })
    setIsCreating(false)
  }

  const createMessage = async (messageContent, senderId, receiverId) => {
    setIsCreating(true)
    await userAxios.post('/api/messages', {
      messageContent,
      senderId,
      receiverId,
      chatRoomId: chatRoom._id,
    }).then(async (res) => {
      console.log(res)
      await chatRoomMessagesRefetch()
    }).catch(err => {
      console.log(err)
    })
    setIsCreating(false)
  }
  return (
    <StateContext.Provider value={{ isCreating, chatRoomMessages, chatRoomMessagesIsLoading, getChatRoom, selectedUser, setSelectedUser, createChatRoom, createMessage, chatErrors, setChatErrors }}>
      {children}
    </StateContext.Provider>
  )
}

export const useChatContext = () => useContext(StateContext)
