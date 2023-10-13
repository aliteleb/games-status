import React from 'react'
import {Link} from 'react-router-dom'
import {RiTwitterXFill} from "react-icons/ri";
import {BsFacebook, BsInstagram} from "react-icons/bs";

function Footer() {
    return (
        <footer className="bg-black bg-opacity-60 shadow">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-4">
                <div className="flex flex-wrap items-center justify-between gap-x-2">
                    <div className='flex text-gray-400 gap-x-3 py-1'>
                        <Link to="#">
                            <BsFacebook className='w-5 h-5 hover:text-facebook transition duration-200'/>
                        </Link>
                        <Link to="#">
                            <RiTwitterXFill className='w-5 h-5 hover:text-twitter transition duration-200'/>
                        </Link>
                        <Link to="#">
                            <BsInstagram className='w-5 h-5 hover:text-pink-500 transition duration-200'/>
                        </Link>
                    </div>
                    <ul className="flex flex-col md:flex-row flex-wrap gap-1 md:gap-5 items-center justify-end mb-6 text-sm font-medium text-gray-500 sm:mb-0">
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
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className="mb-2"><b>Crack-Watcher</b> © 2023, All Rights Reserved.</div>
                    <div className='flex items-center justify-center flex-col md:flex-row'>
                        <div className="font-bold mx-2">Developed By</div>
                        <div>
                            <Link to="https://www.facebook.com/aliteleb183" target='_blank' className="hover:text-gray-300 duration-200">Ali Teleb</Link>
                            <span className="mx-1">&</span>
                            <Link to="https://www.facebook.com/mohamedashour774499/" target='_blank' className="hover:text-gray-300 duration-200">Mohamed Ashour</Link>
                        </div>
                    </div>
                </div>
            </span>
            </div>
        </footer>
    )
}

export default Footer
