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
    <div id={'notifications-bar'} className='fixed top-0 flex h-screen w-72 flex-col pt-6 pl-5 transition-all z-55 -right-[19rem] bg-app-black z-[51] xl:w-[19rem]'>
      <div onClick={collapseSidebar} className='w-fit cursor-pointer'>
          <Xmark className={'text-white'}/>
      </div>
      {user ? <>
        <header className='mt-4 flex justify-center text-gray-200'>
          <h1>Notifications</h1>
        </header>
        <div className="mt-4 flex flex-col justify-center text-gray-200">
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 1</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 2</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 3</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 4</h1>
          <h1 onClick={collapseSidebar} className='mt-4 cursor-pointer'>message 5</h1>
        </div>
      </> : <h1 className='mt-6 text-lg text-gray-200'>You must <Link to="/login" onClick={collapseSidebar} className='cursor-pointer text-xl transition hover:text-gray-100'>login</Link></h1> }

    </div>
  )
}

export default NotificationsBar
