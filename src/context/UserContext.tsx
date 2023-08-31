import React, { createContext, useContext } from 'react'
import Axios from "axios"
import { useQuery } from '@tanstack/react-query';
Axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const StateContext = createContext();

interface User {
  firstname: string,
  lastname: string,
  username: string,
  password: string
}

export const UserContext = ({ children }) => {
  const {data: users, isLoading: usersIsLoading, refetch: usersRefetch} = useQuery(['users'], () => {
    return Axios.get('/api/users').then(res => {
      return res.data
    })
  })

  const createUser = async (user: User) => {
    const { firstname, lastname, username, password } = user
    await Axios.post('/api/users', {firstname, lastname, username, password}).then(async (res) => {
      await usersRefetch()
    }).catch((e) => {
      console.log(e)
    })
  }

  return (
    <StateContext.Provider value={{ users, usersIsLoading, createUser }}>
      {children}
    </StateContext.Provider>
  )
}

export const useUserContext = () => useContext(StateContext)

