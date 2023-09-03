import React, { useEffect } from 'react'
import { useChatContext } from '../context/ChatContext'
import Sender from './Sender'
import Receiver from './Receiver'
import { Formik } from 'formik'
import { useUserAxiosContext } from '../context/UserAxiosContext'

export default function ChatRoom() {
  const { user } = useUserAxiosContext()
  const { selectedUser, createMessage, chatRoomMessages, chatRoomMessagesIsLoading, isCreating } = useChatContext()
    
  return (  
    <div className='h-full bg-gray-400 rounded-md flex justify-center items-center'>
      {Object.keys(selectedUser).length === 0 ? <span>No chat selected</span> : (
        <div className='flex flex-col w-full h-full '>
          
          <div className='flex items-center border-b-2 px-4 py-2 h-14 gap-2'>
            <img className='rounded-[50%] object-cover h-full border aspect-square bg-white' src={`https://robohash.org/${user.username}`} alt="" />
            <span>{selectedUser.username}</span>
          </div>

          <div className='flex flex-col gap-1 px-4 py-2 h-full overflow-auto'>
            {chatRoomMessagesIsLoading ? 'Loading...' : chatRoomMessages?.map(msg => {
              if (msg?.senderId === user?._id) {
                return (
                  <div key={msg._id} className='self-end'>
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
          </div>
          <Formik
            initialValues={{ messageContent: '' }}
            onSubmit={async (values, { resetForm }) => {
              await createMessage(values.messageContent, user._id, selectedUser._id)
              resetForm()
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <form onSubmit={handleSubmit} className='border-t-2 py-2 px-4 flex justify-between gap-4'>
                <input value={values.messageContent} onChange={handleChange} name="messageContent" type="text" className='border border-black py-1 px-4 w-full rounded-[40px]' placeholder='text...' />
                <button type='submit' className='border border-black bg-white px-4 py-1 rounded-[40px]'>
                  {isCreating ? 'sending...' : 'send'}
                </button>
              </form>)}
          </Formik>
        </div>
      )}
    </div>
  )
}
