import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <>
        <div className='mt-28 w-full max-w-screen-xl mx-auto p-6 bg-custom-black bg-opacity-60 rounded-md text-gray-300'>
          <header className='border-b-2 pb-[10px] font-bold text-xl'>Login</header>
          <div className='mt-6 flex flex-col'>
            <label htmlFor="username">Username</label>
            <input type="text"  className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
          </div>
          <div className='mt-6 flex flex-col'>
            <label htmlFor="password">Password</label>
            <input type="password"  className='bg-body rounded mt-2 h-9 px-4 focus:outline-none text-sm'/>
          </div>
          <div className='cursor-pointer w-max mt-6 text-white bg-btn hover:bg-btn-hover transition duration-200 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2'>
            <button>Login</button>
          </div>
          <div className='mt-4 text-sm'>Don't have an account?
            <Link to="/sign-up" className='mx-2 text-white hover:text-gray-300 transition duration-200'>Sign Up</Link>
          </div>
        </div>
        <div className="h-12"></div>
    </>
  )
}

export default Login