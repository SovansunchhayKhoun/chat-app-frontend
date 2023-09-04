import React from 'react'

export default function Dropdown({ children, toggle }: { children: React.ReactNode, toggle: boolean }) {
  return (
    <div className={`${toggle ? 'flex flex-col fixed top-12 border border-cyan-900 rounded-md' : 'hidden'}`}>
      {children}
    </div>
  )
}
