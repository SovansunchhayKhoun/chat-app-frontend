import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useUserAxiosContext } from '../context/UserAxiosContext';
import Dropdown from './Dropdown';
import { AiFillCaretDown } from "react-icons/ai"

export default function Navbar() {
  const navBar = [
    { name: "Home", to: "/" },
    { name: "Chat", to: "/chat" }
  ]
  const { logout } = useAuthContext();
  const { token, user } = useUserAxiosContext()
  const [toggle, setToggle] = useState<boolean>(false)
  return (
    <div className='h-full flex justify-between items-center'>
      <div className='flex gap-4 text-custWhite'>
        {navBar.map((l, i) => (
          <Link className='transition duration-200 hover:bg-custDarkNavy px-2 py-1 rounded-xl' key={i} to={l.to} >
            {l.name}
          </Link>
        ))}
      </div>
      <div>
        {token ? (
          <div onClick={() => setToggle(!toggle)} className='h-8 flex items-center'>
            <div className='flex flex-col relative cursor-pointer'>
              <div className='flex items-center transition duration-200 text-white hover:bg-custDarkNavy px-2 py-1 rounded-xl'>
                {user?.username} <AiFillCaretDown />
              </div>
              <Dropdown toggle={toggle}>
                <button className={`transition duration-200 px-4 py-1 border-b-2 text-custWhite hover:bg-custNavy`} onClick={() => { logout() }}>
                  Logout
                </button>
              </Dropdown>
            </div>
            <img className='shadow-xl rounded-[50%] object-cover h-full' loading='lazy' src={`https://robohash.org/${user?.username}`} alt="" />
          </div>
        ) : (
          <div className='flex text-custWhite'>

            <Link className='transition duration-200 hover:bg-custDarkNavy px-2 rounded-xl py-1' to={"/login"}>
              Login
            </Link>
            <Link className='transition duration-200 hover:bg-custDarkNavy px-2 rounded-xl py-1' to={'/register'}>
              Register
            </Link>

          </div>
        )}
      </div>
    </div>
  )
}
