import { useUserAxiosContext } from '../context/UserAxiosContext'
import { useUserContext } from '../context/UserContext'

export default function UsersView() {
  const { usersIsLoading, users } = useUserContext()
  const { token } = useUserAxiosContext()
  return (
    <div className='flex flex-col gap-4'>
      {token ? usersIsLoading ? 'Loading' : users?.map(user => (
        <div className='flex flex-col' key={user?._id}>
          <div className='w-[500px] grid grid-cols-2 gap-2'>
            <div>
              Firstname: {user.firstname}
            </div>
            <div>
              Username: {user.username}
            </div>
          </div>
          <div className='w-[500px] grid grid-cols-2 gap-2'>
            <div>
              Lastname: {user.lastname}
            </div>
            <div>
              ID: {user._id}
            </div>
          </div>
        </div>
      )) : 'Unauthorized'}
    </div>

  )
}
