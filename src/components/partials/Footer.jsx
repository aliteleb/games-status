import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from '../icons/TwitterIcon'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'

function Footer() {
  return (
    <footer className="bg-black bg-opacity-60 rounded-lg shadow mt-20">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className='flex mb-6 sm:mb-0 text-gray-400'>
                    <Link to="#">
                        <TwitterIcon />
                    </Link>
                    <Link to="#" className="ml-5 ">
                        <Facebook />
                    </Link>
                    <Link to="#" className="ml-5 ">
                        <Instagram />
                    </Link>
                </div>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                    <li>
                        <Link to="/about" className="mr-4 hover:underline md:mr-6 hover:text-gray-300 ">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="mr-4 hover:underline md:mr-6 hover:text-gray-300">Contact</Link>
                    </li>
                    <li>
                        <Link to="/terms-conditions" className="mr-4 hover:underline md:mr-6 hover:text-gray-300 duration-200">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to="/frequency-questions" className="hover:underline hover:text-gray-300">Frequency Questions</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center">
                © 2023 <Link to="https://www.facebook.com/aliteleb183" target='_blank' class="hover:underline hover:text-gray-300 duration-200">Ali Teleb</Link>
                <Link to="https://www.facebook.com/mohamedashour774499/" target='_blank' class="hover:underline hover:text-gray-300 duration-200 ml-2">Mohamed Ashour</Link>. All Rights Reserved.
            </span>
        </div>
    </footer>
  )
}

export default Footer