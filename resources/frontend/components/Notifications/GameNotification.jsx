import React from 'react'
import {IoCheckmarkDoneOutline} from 'react-icons/io5'

function GameNotification() {
  return (
    <div className='flex items-center bg-black/20 relative cursor-pointer'>
      <img className='w-12' src="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/library_600x900.jpg" alt="" />
      <div className='mx-4'>
        <div className='font-bold'>Cyberpunk 2077</div>
        <p>Cracked</p>
      </div>
      <div className='text-green-700/70 absolute right-4 top-[-20px] text-5xl'>.</div>
    </div>
  )
}

export default GameNotification