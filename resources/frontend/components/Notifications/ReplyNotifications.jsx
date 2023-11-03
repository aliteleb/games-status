import React from 'react'
import {IoCheckmarkDoneOutline} from 'react-icons/io5'
import { useAuth } from '../api/AuthContext'

function ReplyNotification() {

  const {user} = useAuth()
  console.log(user);

  return (
    <div className='flex items-center bg-black/20'>
      <img className='w-12 rounded-full' src={user?.avatar} alt="" />
      <div className='mx-4'>
        <div className='text-center'>11/9/2023</div>
        <p className='max-w-[90%] break-words'>messagemessagemessagemessagemessage</p>
      </div>
        <IoCheckmarkDoneOutline className='w-6 h-6 cursor-pointer hover:text-gray-400'/>
    </div>
  )
}

export default ReplyNotification