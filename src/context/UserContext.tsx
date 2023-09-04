import { createContext, useContext } from 'react'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery } from '@tanstack/react-query';
import { useUserAxiosContext } from './UserAxiosContext';
import type { User } from './UserAxiosContext';

type UserContext = {
  users: User[] | undefined,
  usersIsLoading: boolean,
  usersRefetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<User[], unknown>>
}

const StateContext = createContext<UserContext | null>(null);

export const UserContext = ({ children }: { children: React.ReactNode }) => {
  const { userAxios, token } = useUserAxiosContext()
  const { data: users, isLoading: usersIsLoading, refetch: usersRefetch } = useQuery(['users', token], async () => {
    return await userAxios.get('/users').then((res) => {
      if(!res?.data) return []
      if(res.data) return res?.data
    })
  })

  return (
    <StateContext.Provider value={{ users, usersIsLoading, usersRefetch }}>
      {children}
    </StateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error("useUserContext cannot be used out of UserProvider")
  }
  return context
}