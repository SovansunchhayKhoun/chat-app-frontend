import React from 'react'

export default function Receiver({ message }) {
  return (
    <div className='rounded-md px-4 py-1 bg-purple-200'>{message?.messageContent}</div>
  )
}
