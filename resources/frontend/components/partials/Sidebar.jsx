import React from 'react'
import {NavLink} from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import Xmark from '../icons/Xmark'
import HomeIcon from '../icons/HomeIcon'
import {IoGameControllerOutline} from 'react-icons/io5'
import FreeKeysIcon from '../icons/FreeKeysIcon'
import {GiPirateFlag} from 'react-icons/gi'
import {BsShieldExclamation} from 'react-icons/bs'
import {SiGotomeeting} from 'react-icons/si'
import {FiLogOut} from 'react-icons/fi'
import { useAuth } from '../api/AuthContext'
import {BsGift} from 'react-icons/bs'
import {HiOutlineShoppingBag} from 'react-icons/hi2'
import {GiCreditsCurrency} from 'react-icons/gi'


export function collapseSidebar() {
    document.getElementById('sidebar').style.left = '-18rem';
    document.getElementById('left-nav').style.opacity = '1';
}

function Sidebar() {

    const {user} = useAuth();

    return (
        <div id={'sidebar'} className='fixed top-0 -left-72 flex h-screen w-64 flex-col pt-6 transition-all z-[51] xl:w-72'>
            <div onClick={collapseSidebar} className='mb-4 w-full cursor-pointer px-6'>
                <Xmark className={'text-white'}/>
            </div>
            <nav onClick={collapseSidebar} className="flex h-screen flex-col gap-y-3 px-6 text-white bg-app-black/70">
                <div className="flex items-center gap-x-4">
                    <UserIcon className={'text-red-800'}/>
                    <div>
                        {user &&
                            <NavLink to="/profile" className="transition hover:text-gray-400">PROFILE</NavLink>
                        }

                        {!user &&
                            <div>
                                <NavLink className="transition hover:text-gray-400" to="/login">LOGIN</NavLink>
                                <span className="px-1"> | </span>
                                <NavLink className="transition hover:text-gray-400" to="/signup">SIGN UP</NavLink>
                            </div>
                        }
                    </div>
                </div>

                <NavLink className='flex items-center gap-x-4' to="/">
                    <HomeIcon className={'text-red-800'}/>
                    <span className='transition hover:text-gray-400'>HOME</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/games">
                    <IoGameControllerOutline className='h-10 w-8 text-red-800'/>
                    <span className='transition hover:text-gray-400'>GAMES</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/groups">
                    <GiPirateFlag className='h-10 w-8 text-red-800'/>
                    <span className='transition hover:text-gray-400'>GROUPS</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/protections">
                    <BsShieldExclamation className='h-10 w-8 text-red-800'/>
                    <span className='transition hover:text-gray-400'>PROTECTIONS</span>
                </NavLink>

                <div className='flex items-center gap-x-4 cursor-not-allowed' to="/markets">
                    <HiOutlineShoppingBag className='h-10 w-8 text-red-800'/>
                    <span className='transition hover:text-gray-400 font-bold'>MARKETS</span>
                </div>

                <div className='flex items-center gap-x-4 cursor-not-allowed' to="/markets">
                    <BsGift className="h-10 w-8 text-red-800"/>
                    <span className='transition hover:text-gray-400 font-bold'>FREE GAMES</span>
                </div>

                <div className='flex items-center gap-x-4 cursor-not-allowed' to="/markets">
                    <GiCreditsCurrency className='h-10 w-8 text-red-800'/>
                    <span className='transition hover:text-gray-400 font-bold'>POINTS</span>
                </div>

                {user &&
                    <NavLink className='mt-auto mb-2 flex items-center gap-x-4' to="/logout">
                        <FiLogOut className='h-10 text-red-800 w-[30px]'/>
                        <span className='transition hover:text-gray-400'>LOGOUT</span>
                    </NavLink>
                }
            </nav>
        </div>
    )
}

export default Sidebar
