import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useUserAxiosContext } from './UserAxiosContext';
import type { User } from './UserAxiosContext';

const StateContext = createContext(null);

export const UserContext = ({ children }: { children: React.ReactNode}) => {
  const { userAxios, token } = useUserAxiosContext()
  const { data: users, isLoading: usersIsLoading, refetch: usersRefetch } = useQuery(['users', token], () => {
    return userAxios.get('/api/users').then((res: { data: User[]}) => {
      return res.data
    })
  })
  
  return (
    <StateContext.Provider value={{ users, usersIsLoading, usersRefetch }}>
      {children}
    </StateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(StateContext)

