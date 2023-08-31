import React from 'react'
import { useUserContext } from '../context/UserContext'

export default function UsersList() {
  const { usersIsLoading, users } = useUserContext()
  return (
    <div>
        {usersIsLoading ? 'Loading' : users?.map(user => (
          <div key={user?._id}>
            {user.username} {user?._id} {user.firstname}
          </div>
        ))}
      </div>
  )
}
