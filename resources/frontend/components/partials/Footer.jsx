import React from 'react'
import {Link} from 'react-router-dom'
import {RiTwitterXFill} from "react-icons/ri";
import {BsFacebook, BsInstagram} from "react-icons/bs";

function Footer() {
    return (
        <footer className="z-10 w-full bg-black/50 shadow backdrop-blur-xl" id="footer">
            <div className="mx-auto w-full max-w-screen-xl p-4 md:py-4">
                <div className="flex flex-wrap items-center justify-between gap-x-2">
                    <div className='flex gap-x-3 py-1 text-gray-400'>
                        <Link to="#">
                            <BsFacebook className='h-5 w-5 transition hover:text-facebook'/>
                        </Link>
                        <Link to="#">
                            <RiTwitterXFill className='h-5 w-5 transition hover:text-twitter'/>
                        </Link>
                        <Link to="#">
                            <BsInstagram className='h-5 w-5 transition hover:text-pink-500'/>
                        </Link>
                    </div>
                    <ul className="mb-6 flex flex-col flex-wrap justify-end gap-1 text-sm font-medium text-gray-500 sm:mb-0 md:flex-row md:gap-5">
                        <li>
                            <Link to="/about" className="hover:text-gray-300">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                        </li>
                        <li>
                            <Link to="/terms-conditions" className="hover:text-gray-300">Terms & Conditions</Link>
                        </li>
                        <li>
                            <Link to="/frequency-questions" className="hover:text-gray-300">Frequency Questions</Link>
                        </li>
                    </ul>
                </div>
                <hr className="mx-auto my-2 border-gray-500" />
            <span className="block text-center text-sm text-gray-500">
                <div className='flex flex-col md:flex-row md:justify-between'>
                    <div className="mb-2"><b>Crack-Watcher</b> © 2023, All Rights Reserved.</div>
                    <div className='flex flex-col items-center justify-center md:flex-row'>
                        <div className="mx-2 font-bold">Developed By</div>
                        <div>
                            <Link to="https://www.facebook.com/aliteleb183" target='_blank' className="hover:text-gray-300">Ali Teleb</Link>
                            <span className="mx-1">&</span>
                            <Link to="https://www.facebook.com/mohamedashour774499/" target='_blank' className="hover:text-gray-300">Mohamed Ashour</Link>
                        </div>
                    </div>
                </div>
            </span>
            </div>
        </footer>
    )
}

export default Footer
