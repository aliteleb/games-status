import React from 'react'
import { Link } from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import Xmark from '../icons/Xmark'
import { sidebarContextApi } from '../../App'

function Sidebar() {
  let useContext = React.useContext(sidebarContextApi)
  return (
    <div className='flex flex-col w-64 pl-5 h-screen pt-4 absolute top-0 left-0 bg-custom-black'>
        <div onClick={useContext.sidebarToggle} className='cursor-pointer'>
            <Xmark />
        </div>
        <Link to="login" className='flex items-center mt-4'>
            <UserIcon />
            <span className='ml-[10px]'>LOGIN | SIGN UP</span>
        </Link>
        <Link className='mt-8' to="/">HOME</Link>
        <Link className='mt-8' to="/games">GAMES</Link>
        <Link className='mt-8' to="/free-keys">FREE KEYS</Link>
        <Link className='mt-8' to="/groups">GROUPS</Link>
        <Link className='mt-8' to="/markets">MARKETS</Link>
    </div>
  )
}

export default Sidebar