import { useUserContext } from '../context/UserContext'
import { useUserAxiosContext } from '../context/UserAxiosContext'
import UserCard from '../components/UserCard'
import ChatRoom from '../components/ChatRoom'

export default function ChatView() {
  const { users, usersIsLoading } = useUserContext()
  const { token, user } = useUserAxiosContext()

  return (
    <div>
      {token ? (
        <div className='flex mt-12 h-screen overflow-hidden'>
          <div className='flex h-[70%] gap-4 w-full'>
            {/* list users */}
            <div className='px-4 flex-1 overflow-auto rounded-md bg-blue-400 flex flex-col gap-2'>
              <div className='py-2 border-b-2'>User's list</div>
              {users?.filter(u => u._id !== user?._id).length === 0 && 'No users registered'}
              {usersIsLoading ? 'Loading' : users?.filter(u => u._id !== user?._id).map(user => (<UserCard key={user?._id} user={user} />))}
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
