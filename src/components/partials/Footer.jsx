import React from 'react'
import { Link } from 'react-router-dom'
import TwitterIcon from '../icons/TwitterIcon'
import Facebook from '../icons/Facebook'
import Instagram from '../icons/Instagram'

function Footer() {
  return (
    <footer className="bg-black bg-opacity-60 rounded-lg shadow mt-20">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
            <div className="flex flex-wrap items-center justify-between gap-x-2">
                <div className='flex mb-6 sm:mb-0 text-gray-400'>
                    <Link to="#">
                        <Facebook />
                    </Link>
                    <Link to="#" className="ml-5">
                        <TwitterIcon />
                    </Link>
                    <Link to="#" className="ml-5 ">
                        <Instagram />
                    </Link>
                </div>
                <ul className="w-1/2 flex flex-col md:flex-row flex-wrap gap-1 md:gap-5 items-center justify-end mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                    <li>
                        <Link to="/about" className="hover:text-gray-300 ">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                    </li>
                    <li>
                        <Link to="/terms-conditions" className="hover:text-gray-300 duration-200">Terms & Conditions</Link>
                    </li>
                    <li>
                        <Link to="/frequency-questions" className="hover:text-gray-300">Frequency Questions</Link>
                    </li>
                </ul>
            </div>
            <hr className="my-2 border-gray-500 mx-auto" />
            <span className="block text-sm text-gray-500 text-center">
                <div>Crack-Watcher © 2023, All Rights Reserved.</div>
                <br/>
                <div className="font-bold">Developed By</div>
                <Link to="https://www.facebook.com/aliteleb183" target='_blank' className="hover:text-gray-300 duration-200">Ali Teleb</Link>
                <span className="mx-1">&</span>
                <Link to="https://www.facebook.com/mohamedashour774499/" target='_blank' className="hover:text-gray-300 duration-200">Mohamed Ashour</Link>.
            </span>
        </div>
    </footer>
  )
}

export default Footer