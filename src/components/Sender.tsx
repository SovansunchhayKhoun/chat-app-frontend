import React from 'react'

export default function Sender({ message }) {
  return (
    <div className='bg-blue-200 px-4 py-1 rounded-md'>{message?.messageContent}</div>
  )
}
