import { useEffect } from 'react'
import { useUserContext } from '../context/UserContext'
import { useUserAxiosContext } from '../context/UserAxiosContext'
import UserCard from '../components/UserCard'
import ChatRoom from '../components/ChatRoom'
import { useChatContext } from '../context/ChatContext'

export default function ChatView() {
  const { users, usersIsLoading } = useUserContext()
  const { token, user } = useUserAxiosContext()

  return (
    <div>
      {token ? (
        <div className='flex mt-12 h-screen'>
          <div className='flex h-[70%] gap-4'>
            {/* list users */}
            <div className='flex-1 overflow-auto flex flex-col gap-2'>
              {usersIsLoading ? 'Loading' : users?.filter(u => u._id !== user._id).map(user => (<UserCard key={user?._id} user={user} />))}
            </div>
            {/* Chat Panel */}
            <div className='flex-1'>
              <ChatRoom />
            </div>
          </div>
        </div>
      ) : 'Unauthorized'}
    </div>
  )
}
