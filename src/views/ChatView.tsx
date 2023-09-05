import { useUserAxiosContext } from '../context/UserAxiosContext'
import ChatRoom from '../components/ChatRoom'
import UserList from '../components/UserList'

export default function ChatView() {

  const { token } = useUserAxiosContext()
  return (
    <div>
      {token ? (
        <div className='flex md:mt-12 h-screen overflow-hidden'>
          <div className='flex h-[70%] gap-4 w-full'>
            <UserList />
            <ChatRoom />
          </div>
        </div>
      ) : <span className='text-custWhite'>Unauthorized</span>}
    </div >
  )
}
