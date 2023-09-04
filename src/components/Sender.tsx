import type { Message } from '../context/ChatContext'

export default function Sender({ message }: { message: Message }) {
  return (
    <div className='bg-custDarkNavy text-custWhite px-4 py-1 rounded-md'>{message?.messageContent}</div>
  )
}
