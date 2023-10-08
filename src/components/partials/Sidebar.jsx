import React from 'react'
import { Link } from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import Xmark from '../icons/Xmark'
import HomeIcon from '../icons/HomeIcon'
import GamesIcon from '../icons/GamesIcon'
import FreeKeysIcon from '../icons/FreeKeysIcon'
import GroupsIcon from '../icons/GroupsIcon'
import MarketsIcon from '../icons/MarketsIcon'
import ProtectionsIcon from '../icons/ProtectionsIcon'
import ForumIcon from '../icons/ForumIcon'

function Sidebar() {
  return (
    <div id={'sidebar'} className='flex flex-col w-64 pl-5 h-screen pt-6 absolute top-0 -left-64 transition-all bg-custom-black z-10'>
      <div onClick={()=>{ document.querySelector('#sidebar').style.left = '-16rem';}} className='cursor-pointer'>
          <Xmark className={'text-white'}/>
      </div>
      <Link to="login" className='flex items-center mt-4 '>
          <UserIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white'>LOGIN | SIGN UP</span>
      </Link>
      <Link className='flex items-center mt-4' to="/">
          <HomeIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white'>HOME</span>
      </Link>
      <Link className='flex items-center mt-4 text-white' to="/games">
          <GamesIcon />
          <span className='ml-[10px] text-white'>GAMES</span>
      </Link>
      <Link className='flex items-center mt-4 text-white' to="/free-keys">
          <FreeKeysIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white'>FREE KEYS</span>
      </Link>
      <Link className='flex items-center mt-4 text-white' to="/groups">
          <GroupsIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white'>GROUPS</span>
      </Link>
      <Link className='flex items-center mt-4 text-white' to="/markets">
          <MarketsIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white'>MARKETS</span>
      </Link>
      <Link className='flex items-center mt-4 text-white' to="/markets">
          <ProtectionsIcon/>
          <span className='ml-[10px] text-white'>PROTECTIONS</span>
      </Link>
      <Link className='flex items-center mt-4 text-white' to="/markets">
          <ForumIcon/>
          <span className='ml-[10px] text-white'>FORUM</span>
      </Link>
    </div>
  )
}

export default Sidebar