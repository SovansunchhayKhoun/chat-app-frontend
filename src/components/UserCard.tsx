import { useChatContext } from '../context/ChatContext'
import { useUserAxiosContext, type User } from '../context/UserAxiosContext'

export default function UserCard({ user: renderedUser }: { user: User }) {
  const {  setSelectedUser, getChatRoom } = useChatContext()
  const { user } = useUserAxiosContext()
  const matchedUser = () => user?._id === renderedUser?._id
  return (
    <div onClick={() => {
      setSelectedUser(renderedUser)
      getChatRoom(user?._id, renderedUser?._id)
      // createChatRoom(user)
    }} className={`${matchedUser() && 'bg-custTeal'} transition duration-200 hover:border-l-2 hover:border-custWhite border-l-2 border-custBlue cursor-pointer flex rounded-md bg-custBlue gap-2 items-start h-16 px-8 py-2`}>
      <img src={`https://robohash.org/${renderedUser.username}`} loading='lazy' className={`${matchedUser() && 'border-custNavy'} rounded-[50%] border-2 border-custTeal h-full aspect-square object-cover`} alt="" />
      <div className='flex flex-col h-full overflow-hidden'>
        <p className='font-semibold text-custWhite'>{renderedUser.username}</p>
        <p className='text-sm text-gray-200 w-[70%] text-ellipsis whitespace-nowrap overflow-hidden'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas amet aspernatur</p>
      </div>
    </div>
  )
}
