import React, { useState, useContext, createContext } from 'react'
import Axios, { AxiosResponse } from "axios"
import type { User } from './UserAxiosContext'
import { useUserAxiosContext } from './UserAxiosContext'
Axios.defaults.baseURL = import.meta.env.VITE_API_URL+'/api'
Axios.defaults.withCredentials = true

type Error = {
  message: string,
  [x: string]: unknown
}

type AuthContext = {
  register: (user: User, resetForm: CallableFunction) => Promise<void>,
  login: (username: string, password: string, resetForm: CallableFunction) => Promise<void>,
  logout: () => Promise<void>,
  authError: Error[],
  setAuthError: React.Dispatch<React.SetStateAction<Error[]>>,
  loginSuccess: boolean,
  registerSuccess: boolean,
  isLogin: boolean,
  isLogout: boolean,
  isRegister: boolean,
}

const StateContext = createContext<AuthContext | null>(null)

export default function AuthContext({ children }: { children: React.ReactNode }) {
  const { token, setToken, setUser, getUser } = useUserAxiosContext()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [authError, setAuthError] = useState<Error[]>([])
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isLogout, setIsLogout] = useState(false)

  const register = async (user: User, resetForm: CallableFunction) => {
    const { firstname, lastname, username, password, confirmPassword } = user
    setIsRegister(true)
    await Axios.post('/register', { firstname, lastname, username, password, confirmPassword }).then(() => {
      setRegisterSuccess(true)
      setAuthError([]) // clear auth error
      resetForm() // clear form values

      setTimeout(() => {
        setRegisterSuccess(false)
      }, (3000));
    }).catch((e) => {
      setRegisterSuccess(false)
      const { response } = e;
      setAuthError([response?.data, ...authError])
      console.log(e)
    })
    setIsRegister(false)
  }

  const login = async (username: string, password: string, resetForm: CallableFunction) => {
    setIsLogin(true)
    await Axios.post('/login', {
      username, password
    }).then(({ data }: AxiosResponse) => {
      setAuthError([]) // clear auth errors
      setLoginSuccess(true)
      resetForm() // clear form values
      setTimeout(() => {
        setLoginSuccess(false)
      }, (3000));
      setToken(data.accessToken)
      getUser()
    }).catch((err) => {
      const { response } = err;
      setLoginSuccess(false)
      setAuthError([response?.data, ...authError])
      console.log(err)
    })
    setIsLogin(false)
  }

  const logout = async () => {
    console.log("loggin out...")
    setIsLogout(true)
    await Axios.post('/logout', token).then(() => {
      setUser({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
      })
      setToken('')
    })
    setIsLogout(false)
  }

  return (
    <StateContext.Provider value={{
      register, login, logout, authError, setAuthError,
      loginSuccess,
      registerSuccess,
      isLogin,
      isLogout,
      isRegister
    }}>
      {children}
    </StateContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error(
      "useAuthContext must be used within a UserAuthContextProvider"
    )
  }
  return context
}