import type { Message } from '../context/ChatContext'

export default function Receiver({ message }: { message: Message }) {
  return (
    <div className='rounded-md px-4 py-1 bg-custBlue text-custWhite'>{message?.messageContent}</div>
  )
}
