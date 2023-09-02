import React from 'react'
import { useChatContext } from '../context/ChatContext'

export default function UserCard({ user }) {
  const { createChatRoom, setSelectedUser } = useChatContext()
  return (
    <div onClick={() => {
      setSelectedUser(user)
      createChatRoom(user)
    }} className='flex rounded-md bg-cyan-200 gap-2 items-start h-16 px-8 py-2'>
      <img src={`https://robohash.org/${user.username}`} className='rounded-[50%] border border-black h-full aspect-square object-cover' alt="" />
      <div className='flex flex-col h-full overflow-hidden'>
        <p className='font-semibold'>{user.username}</p>
        <p className='text-sm text-gray-700 w-[70%] text-ellipsis whitespace-nowrap overflow-hidden'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas amet aspernatur</p>
      </div> 
    </div>
  )
}
