import React, { useEffect, useRef } from 'react'
import { useChatContext } from '../context/ChatContext'
import Sender from './Sender'
import Receiver from './Receiver'
import { Formik } from 'formik'
import { useUserAxiosContext } from '../context/UserAxiosContext'
import { socket } from '../socket/socket'

export default function ChatRoom() {
  const { user } = useUserAxiosContext()
  const { selectedUser, createMessage, chatMessages, chatRoomMessagesIsLoading, isCreating, chatRoomMessagesRefetch } = useChatContext()
  const chatScroll = useRef<HTMLDivElement>(null)
  useEffect(() => {
    chatScroll?.current?.scrollIntoView({ behavior: "smooth", block: 'end' })
    const messageListener = () => {
      socket().on("receive_message", () => {
        chatRoomMessagesRefetch()
      })
    }
    messageListener()
  })

  return (
    <div className='h-full bg-custLightNavy rounded-md flex justify-center items-center'>
      {!selectedUser ? <span className='text-custWhite'>No chat selected</span> : (
        <div className='flex flex-col w-full h-full '>

          <div className='flex text-custWhite font-bold items-center border-b-2 px-4 py-2 h-14 gap-2'>
            <img className='rounded-[50%] object-cover h-full border aspect-square bg-white' loading='lazy' src={`https://robohash.org/${selectedUser?.username}`} alt="" />
            <span>{selectedUser?.username}</span>
          </div>

          <div className='container flex flex-col gap-1 px-4 py-2 h-full overflow-auto'>
            {chatRoomMessagesIsLoading ? 'Loading...' : chatMessages?.map(msg => {
              if (msg?.senderId === user?._id) {
                return (
                  <div key={msg?._id} className='self-end'>
                    <Sender message={msg} />
                  </div>
                )
              } else {
                return (
                  <div key={msg?._id} className='self-start'>
                    <Receiver message={msg} />
                  </div>
                )
              }
            })}
            <div ref={chatScroll}></div>
          </div>
          <Formik
            initialValues={{ messageContent: '' }}
            onSubmit={async (values, { resetForm }) => {
              await createMessage(values.messageContent, user?._id, selectedUser?._id)
              resetForm()
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className='border-t-2 py-2 px-4 flex justify-between gap-4'>
                <input value={values.messageContent} onChange={handleChange} name="messageContent" type="text" className='shadow-md py-1 px-4 w-full rounded-lg' placeholder='text...' />
                <button disabled={isCreating} type='submit' className='transition duration-200 hover:bg-gray-200 border-b-2 border-custBlue bg-custWhite px-4 py-1 rounded-lg'>
                  {isCreating ? 'sending...' : 'send'}
                </button>
              </form>)}
          </Formik>
        </div>
      )}
    </div>
  )
}