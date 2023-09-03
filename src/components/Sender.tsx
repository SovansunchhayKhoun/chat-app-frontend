import React from 'react'
import type { Message } from '../context/ChatContext'

export default function Sender({ message }: { message: Message }) {
  return (
    <div className='bg-blue-200 px-4 py-1 rounded-md'>{message?.messageContent}</div>
  )
}
