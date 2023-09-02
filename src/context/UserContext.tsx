import { createContext, useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useUserAxiosContext } from './UserAxiosContext';

const StateContext = createContext();

export const UserContext = ({ children }) => {
  const { userAxios, token } = useUserAxiosContext()
  const { data: users, isLoading: usersIsLoading, refetch: usersRefetch } = useQuery(['users', token], () => {
    return userAxios.get('/api/users').then((res: { data: any; }) => {
      return res.data
    })
  })

  return (
    <StateContext.Provider value={{ users, usersIsLoading, usersRefetch }}>
      {children}
    </StateContext.Provider>
  )
}

export const useUserContext = () => useContext(StateContext)

