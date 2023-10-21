import React from 'react'
import Xmark from '../icons/Xmark';
import { useAuth } from '../api/AuthContext';
import { Link } from 'react-router-dom';


export function collapseSidebar(){
  document.querySelector('#notifications-bar').style.right = '-19rem';
}

function NotificationsBar() {

  let {user} = useAuth()
  return (
    <div id={'notifications-bar'} className='z-55 flex flex-col w-72 xl:w-[19rem] pl-5 h-screen pt-6 fixed top-0 -right-[19rem] transition-all bg-custom-black z-[51]'>
      <div onClick={collapseSidebar} className='cursor-pointer w-fit'>
          <Xmark className={'text-white'}/>
      </div>
      {user ? <>
        <header className='text-gray-200 flex justify-center mt-4'>
          <h1>Notifications</h1>
        </header>
        <div className="text-gray-200 flex flex-col justify-center mt-4">
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 1</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 2</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 3</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 4</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 5</h1>
        </div>
      </> : <h1 className='text-gray-200 mt-6 text-lg'>You must <Link to="/login" onClick={collapseSidebar} className='text-xl cursor-pointer hover:text-gray-100 transition '>login</Link></h1> }

    </div>
  )
}

export default NotificationsBar
