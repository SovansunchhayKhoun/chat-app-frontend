import React from 'react'

export default function Dropdown({ children, toggle, setToggle }: { children: React.ReactNode, toggle: boolean, setToggle?: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className={`${toggle ? 'flex flex-col fixed top-12 border border-cyan-900 rounded-md' : 'hidden'}`}>
      {children}
    </div>
  )
}
