import type { Message } from '../context/ChatContext'

export default function Receiver({ message }: { message: Message }) {

  return (
    <div className='flex flex-col'>
      <div className='flex items-center gap-1 text-custWhite'>
        <div className='bg-custBlue text-custWhite px-4 py-1 rounded-md'>
          {message?.messageContent}
        </div>
        <div className='text-xs'>
          {message?.timeSent?.slice(10).slice(0, 6)}
        </div>
      </div>
    </div>
  )
}
