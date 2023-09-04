import { useChatContext } from '../context/ChatContext'
import type { User } from '../context/UserAxiosContext'

export default function UserCard({ user }: { user: User }) {
  const { createChatRoom, setSelectedUser, selectedUser } = useChatContext()
  const matchedUser = () => user._id === selectedUser?._id
  return (
    <div onClick={() => {
      setSelectedUser(user)
      createChatRoom(user)
    }} className={`${matchedUser() && 'bg-custTeal'} transition duration-200 hover:border-l-2 hover:border-custWhite border-l-2 border-custBlue cursor-pointer flex rounded-md bg-custBlue gap-2 items-start h-16 px-8 py-2`}>
      <img src={`https://robohash.org/${user.username}`} loading='lazy' className={`${matchedUser() && 'border-custNavy'} rounded-[50%] border-2 border-custTeal h-full aspect-square object-cover`} alt="" />
      <div className='flex flex-col h-full overflow-hidden'>
        <p className='font-semibold text-custWhite'>{user.username}</p>
        <p className='text-sm text-gray-200 w-[70%] text-ellipsis whitespace-nowrap overflow-hidden'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas amet aspernatur</p>
      </div>
    </div>
  )
}
