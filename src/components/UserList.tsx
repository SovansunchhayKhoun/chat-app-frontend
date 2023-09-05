import { useUserContext } from '../context/UserContext'
import { useUserAxiosContext } from '../context/UserAxiosContext'
import UserCard from '../components/UserCard'
import { useChatContext } from '../context/ChatContext'

export default function UserList() {
  const { users, usersIsLoading } = useUserContext()
  const { user } = useUserAxiosContext()
  const { selectedUser } = useChatContext()
  return (
    <div className={`${selectedUser && 'md:flex hidden'} ${!selectedUser && 'flex'} flex-col pb-4 gap-2 text-custWhite px-4 flex-1 overflow-auto rounded-md bg-[#053B50]`}>
      <div className='py-2 border-b-2'>User's list</div>
      {users?.filter(u => u._id !== user?._id).length === 0 && 'No users registered'}
      {usersIsLoading ? 'Loading' : users?.filter(u => u._id !== user?._id).map(user => (<UserCard key={user?._id} user={user} />))}
    </div>
  )
}
