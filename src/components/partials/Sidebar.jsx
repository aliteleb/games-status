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

  function collapseSidebar(){
    document.querySelector('#sidebar').style.left = '-16rem';
  }

  return (
    <div id={'sidebar'} className='flex flex-col w-64 pl-5 h-screen pt-6 fixed top-0 -left-64 transition-all bg-custom-black z-10'>
      <div onClick={collapseSidebar} className='cursor-pointer w-fit'>
          <Xmark className={'text-white'}/>
      </div>

      <Link onClick={collapseSidebar} to="login" className='flex items-center mt-4 '>
          <UserIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>LOGIN | SIGN UP</span>
      </Link>

      <Link onClick={collapseSidebar} className='flex items-center mt-4' to="/">
          <HomeIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>HOME</span>
      </Link>

      <Link onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/games">
          <GamesIcon />
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>GAMES</span>
      </Link>

      <Link onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/free-keys">
          <FreeKeysIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>FREE KEYS</span>
      </Link>

      <Link onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/groups">
          <GroupsIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>GROUPS</span>
      </Link>

      <Link onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/markets">
          <MarketsIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>MARKETS</span>
      </Link>

      <Link onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/protections">
          <ProtectionsIcon/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>PROTECTIONS</span>
      </Link>
      
      <Link onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/forum">
          <ForumIcon/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>FORUM</span>
      </Link>
    </div>
  )
}

export default Sidebar
