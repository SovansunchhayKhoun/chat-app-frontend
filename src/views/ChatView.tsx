import { useUserAxiosContext } from '../context/UserAxiosContext'
import ChatRoom from '../components/ChatRoom'
import UserList from '../components/UserList'
import { useChatContext } from '../context/ChatContext'

export default function ChatView() {

  const { token } = useUserAxiosContext()
  const { selectedUser } = useChatContext()
  return (
    <div>
      {token ? (
        <div className=''>
          {/** From Tablet Screen */}
          <div>
            <div className='flex mt-12 h-screen overflow-hidden'>
              <div className='flex h-[70%] gap-4 w-full'>
                <UserList />
                {/* Chat Panel */}
                <div className={`md:flex md:flex-1 ${!selectedUser && 'hidden'}`}>
                  <ChatRoom />
                </div>
              </div>
            </div>

          </div>
        </div>
      ) : <span className='text-custWhite'>Unauthorized</span>}

    </div >
  )
}
