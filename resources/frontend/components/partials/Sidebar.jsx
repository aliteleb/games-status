import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import Xmark from '../icons/Xmark'
import HomeIcon from '../icons/HomeIcon'
import GamesIcon from '../icons/GamesIcon'
import FreeKeysIcon from '../icons/FreeKeysIcon'
import GroupsIcon from '../icons/GroupsIcon'
import MarketsIcon from '../icons/MarketsIcon'
import ProtectionsIcon from '../icons/ProtectionsIcon'
import ForumIcon from '../icons/ForumIcon'
import {useAuth} from "../api/AuthContext";



export function collapseSidebar(){
  document.querySelector('#sidebar').style.left = '-18rem';
}

function Sidebar() {

  const {user} = useAuth();
  let loginRef = React.useRef(null)
  user ? loginRef.current.classList.remove("active") : ""

  return (
    <div id={'sidebar'} className='flex flex-col w-64 xl:w-72 pl-5 h-screen pt-6 fixed top-0 -left-72 transition-all bg-custom-black z-10'>
      <div onClick={collapseSidebar} className='cursor-pointer w-fit'>
          <Xmark className={'text-white'}/>
      </div>
    <nav>

      <NavLink ref={loginRef} onClick={collapseSidebar} to={user ? "/" : "/login"} className={`flex items-center mt-4`}>
          <UserIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>LOGIN | SIGN UP</span>
      </NavLink>

      <NavLink onClick={collapseSidebar} className='flex items-center mt-4' to="/">
          <HomeIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>HOME</span>
      </NavLink>

      <NavLink onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/games">
          <GamesIcon />
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>GAMES</span>
      </NavLink>

      <NavLink onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/free-keys">
          <FreeKeysIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>FREE KEYS</span>
      </NavLink>

      <NavLink onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/groups">
          <GroupsIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>GROUPS</span>
      </NavLink>

      <NavLink onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/markets">
          <MarketsIcon className={'text-red-800'}/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>MARKETS</span>
      </NavLink>

      <NavLink onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/protections">
          <ProtectionsIcon/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>PROTECTIONS</span>
      </NavLink>
      
      <NavLink onClick={collapseSidebar} className='flex items-center mt-4 text-white' to="/forum">
          <ForumIcon/>
          <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>FORUM</span>
      </NavLink>
    </nav>
    </div>
  )
}

export default Sidebar
