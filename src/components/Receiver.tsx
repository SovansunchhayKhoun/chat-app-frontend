import React from 'react'
import type { Message } from '../context/ChatContext'

export default function Receiver({ message }: { message: Message }) {
  return (
    <div className='rounded-md px-4 py-1 bg-purple-200'>{message?.messageContent}</div>
  )
}
