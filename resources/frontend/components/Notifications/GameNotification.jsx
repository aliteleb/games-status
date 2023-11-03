import React from 'react'
import {IoCheckmarkDoneOutline} from 'react-icons/io5'

function GameNotification() {
  return (
    <div className='flex items-center'>
      <img className='w-12' src="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg" alt="" />
      <div className='mx-4'>
        <div className='text-center'>11/9/2023</div>
        <p className='max-w-[90%] break-words'>messagemessagemessagemessagemessage</p>
      </div>
        <IoCheckmarkDoneOutline className='w-6 h-6 cursor-pointer hover:text-gray-400'/>
    </div>
  )
}

export default GameNotification