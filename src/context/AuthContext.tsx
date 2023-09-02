import React, { useState, useContext, createContext } from 'react'
import Axios from "axios"
import { useUserAxiosContext } from './UserAxiosContext'
Axios.defaults.baseURL = import.meta.env.VITE_API_URL
Axios.defaults.withCredentials = true

interface User {
  firstname: string,
  lastname: string,
  username: string,
  password: string
}

const StateContext = createContext()

export default function AuthContext({ children }) {
  const { token, setToken, setUser, getUser } = useUserAxiosContext()
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [authError, setAuthError] = useState([])
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [isLogout, setIsLogout] = useState(false)

  const register = async (user: User, resetForm: CallableFunction) => {
    const { firstname, lastname, username, password, confirmPassword } = user
    setIsRegister(true)
    await Axios.post('/api/register', { firstname, lastname, username, password, confirmPassword }).then(res => {
      setRegisterSuccess(true)
      setAuthError([]) // clear auth error
      resetForm() // clear form values

      setTimeout(() => {
        setRegisterSuccess(false)
      }, (3000));
    }).catch((e: unknown) => {
      setRegisterSuccess(false)
      const { response } = e;
      setAuthError([response.data, ...authError])
      console.log(e)
    })
    setIsRegister(false)
  }

  const login = async (username: string, password: string, resetForm: CallableFunction) => {
    setIsLogin(true)
    await Axios.post('/api/login', {
      username, password
    }).then(({ data }) => {
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
      setAuthError([response.data, ...authError])
      console.log(err)
    })
    setIsLogin(false)
  }

  const logout = async () => {
    console.log("loggin out...")
    setIsLogout(true)
    await Axios.post('/api/logout', token).then(() => {
      setUser({
        firstname: '',
        lastname: '',
        password: '',
        username: ''
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
export const useAuthContext = () => useContext(StateContext)