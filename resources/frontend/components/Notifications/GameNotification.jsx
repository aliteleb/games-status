import React from 'react'
import {IoCheckmarkDoneOutline} from 'react-icons/io5'

function GameNotification() {
  return (
    <div className='flex p-4 items-center bg-[#1d1c1c]'>
      <img className='w-12 h-12 rounded' src="https://store.playstation.com/store/api/chihiro/00_09_000/container/FR/fr/99/EP1004-CUSA08519_00-AV00000000000004/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=336&h=336" alt="" />
      <div className='mx-4'>
        <div className='text-center'>11/9/2023</div>
        <p className='max-w-[90%] break-words'>messagemessagemessagemessagemessage</p>
      </div>
        <IoCheckmarkDoneOutline className='w-6 h-6 cursor-pointer hover:text-gray-400'/>
    </div>
  )
}

export default GameNotification