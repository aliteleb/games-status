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
import {useAuth} from "../api/AuthContext"
import {FiLogOut} from 'react-icons/fi'
import ApiClient from '../../services/ApiClient'



export function collapseSidebar(){
  document.querySelector('#sidebar').style.left = '-18rem';
}

function Sidebar() {

  const {user, logoutFn} = useAuth();

  let logout = async () => {

    let response = await ApiClient().get('/logout')
    
    if(response.data){
      logoutFn()
      collapseSidebar()
    }
  }

  return (
    <div id={'sidebar'} className='flex flex-col w-64 xl:w-72 pl-5 h-screen pt-6 fixed top-0 -left-72 transition-all bg-custom-black z-10'>
      <div onClick={collapseSidebar} className='cursor-pointer w-fit'>
          <Xmark className={'text-white'}/>
      </div>
      <nav>
        <div onClick={collapseSidebar} className={`flex items-center mt-4`}>
            <UserIcon className={'text-red-800'}/>
            <Link to={user ? "/profile" : "/login"} className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>
              {!user ?
              <>
                <NavLink to="/login">LOGIN</NavLink>
                <NavLink to="/sign-up"> | SIGN UP</NavLink>
              </> : 'Profile'}
            </Link>
        </div>


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

        { user &&
          <Link onClick={logout} className='flex absolute bottom-12 items-center mt-4 text-white' to="/login">
              <FiLogOut className='w-[30px] h-10 text-red-800'/>
              <span className='ml-[10px] text-white hover:text-gray-400 transition duration-100 ease-in-out'>LOGOUT</span>
          </Link>
        }
      </nav>
    </div>
  )
}

export default Sidebar
