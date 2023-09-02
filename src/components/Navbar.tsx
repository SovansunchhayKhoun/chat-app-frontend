import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useUserAxiosContext } from '../context/UserAxiosContext';

export default function Navbar() {
  const navBar = [
    { name: "Home", to: "/" },
    { name: "Users", to: "/users" },
    { name: "Chat", to: "/chat" }
  ]
  const { logout } = useAuthContext();
  const { token, user } = useUserAxiosContext()
  return (
    <div className='flex justify-between items-center'>
      <div className='flex gap-4'>
        {token && (
          <div>
            {user?.username}
          </div>
        )}
        {navBar.map((l, i) => (
          <Link key={i} to={l.to} >
            {l.name}
          </Link>
        ))}
      </div>
      <div className={`flex gap-2`}>
        <Link to={"/login"}>
          Login
        </Link>
        {token ? (
          <button onClick={() => { logout() }}>
            Logout
          </button>
        ) : (
          <Link to={'/register'}>
            Register
          </Link>
        )}
      </div>
    </div>
  )
}
