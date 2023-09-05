import { useEffect } from 'react'
import { useChatContext } from '../context/ChatContext'
import Sender from './Sender'
import Receiver from './Receiver'
import { Formik } from 'formik'
import { useUserAxiosContext } from '../context/UserAxiosContext'
import { socket } from '../socket/socket'
import * as Yup from "yup"
import { HiOutlineArrowNarrowLeft } from "react-icons/hi"

const MessageSchema = Yup.object().shape({
  messageContent: Yup.string().required().min(1).trim()
});

export default function ChatRoom() {
  const { user } = useUserAxiosContext()
  const { selectedUser, createMessage, isSending, messages, setMessages, chatScroll, isCreating, setSelectedUser } = useChatContext()

  useEffect(() => {
    chatScroll.current?.scrollIntoView({ behavior: "smooth", block: 'end' })
  }, [messages, setMessages, chatScroll])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages([...messages, data])
    })
  }, [messages, setMessages])

  return (
    <div className='flex-1 h-screen flex flex-col'>
      <div onClick={() => {
        setSelectedUser(undefined)
      }} className='md:hidden self-start px-4 py-2 text-[24px] text-custWhite'>
        <HiOutlineArrowNarrowLeft />
      </div>

      <div className='bg-custLightNavy rounded-md h-[70%] flex flex-col justify-center items-center'>
        {!selectedUser ? <span className='text-custWhite'>No chat selected</span> : (
          <div className='flex flex-col w-full h-full'>

            <div className='flex text-custWhite font-bold items-center border-b-2 py-2 h-14 px-4 gap-2'>
              <img className='rounded-[50%] object-cover h-full border aspect-square bg-white' loading='lazy' src={`https://robohash.org/${selectedUser?.username}`} alt="" />
              <span>{selectedUser?.username}</span>
            </div>

            <div className='flex flex-col gap-2 px-4 py-2 text-custWhite overflow-auto'>
              {isCreating ? <span>Loading Chat...</span> : messages?.length === 0 ? <span>Empty Chat box</span> : messages?.map((msg, id) => {
                if (msg?.senderId === user?._id) {
                  return (
                    <div key={id} className='self-end'>
                      <Sender message={msg} />
                    </div>
                  )
                } else {
                  return (
                    <div key={id} className='self-start'>
                      <Receiver message={msg} />
                    </div>
                  )
                }
              })}
              <div className='text-xs self-end text-custWhite'>{isSending && 'sending'}</div>
              <div ref={chatScroll}></div>
            </div>

            <Formik
              validationSchema={MessageSchema}
              initialValues={{ messageContent: '' }}
              onSubmit={async (values, { resetForm }) => {
                await createMessage(values.messageContent, user._id, selectedUser?._id)
                resetForm()
              }}
            >
              {({ handleChange, handleSubmit, values }) => (
                <form onSubmit={handleSubmit} className='mt-auto border-t-2 py-2 px-4 flex justify-between gap-4'>
                  <input value={values.messageContent} onChange={handleChange} name="messageContent" type="text" className='shadow-md py-1 px-4 w-full rounded-lg' placeholder='text...' />
                  <button disabled={isSending} type='submit' className='transition duration-200 hover:bg-gray-200 border-b-2 border-custBlue bg-custWhite px-4 py-1 rounded-lg'>
                    send
                  </button>
                </form>)}
            </Formik>
          </div>
        )}
      </div>
    </div>
  )
}