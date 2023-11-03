import React from 'react'
import {IoCheckmarkDoneOutline} from 'react-icons/io5'
import { useAuth } from '../api/AuthContext'

function ReplyNotification() {

  const {user} = useAuth()

  return (
    <div className='flex items-center bg-black/20 relative cursor-pointer'>
          <img className='w-12 rounded-full' src={user?.avatar} alt="" />
      <div className='mx-4 py-4'>
        <div className='font-bold'>Someone</div>
        <p>Someone replied to you</p>
      </div>
      <div className='text-green-700/70 absolute right-4 top-[-20px] text-5xl'>.</div>
    </div>
  )
}

export default ReplyNotification