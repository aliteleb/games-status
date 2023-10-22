import React from 'react'
import {NavLink} from 'react-router-dom'
import UserIcon from '../icons/UserIcon'
import Xmark from '../icons/Xmark'
import HomeIcon from '../icons/HomeIcon'
import {IoGameControllerOutline} from 'react-icons/io5'
import FreeKeysIcon from '../icons/FreeKeysIcon'
import GroupsIcon from '../icons/GroupsIcon'
import MarketsIcon from '../icons/MarketsIcon'
import {BsShieldExclamation} from 'react-icons/bs'
import {SiGotomeeting} from 'react-icons/si'
import {useAuth} from "../api/AuthContext"
import {FiLogOut} from 'react-icons/fi'
import ApiClient from '../../services/ApiClient'


export function collapseSidebar() {
    document.querySelector('#sidebar').style.left = '-18rem';
}

function Sidebar() {

    const {user, logoutFn} = useAuth();

    let logout = async () => {

        let response = await ApiClient().get('/logout')

        if (response.data) {
            logoutFn()
            collapseSidebar()
        }
    }

    return (
        <div id={'sidebar'} className='z-[51] flex flex-col w-64 xl:w-72 px-6 h-screen pt-6 fixed top-0 -left-72 transition-all bg-app-black'>
            <div onClick={collapseSidebar} className='cursor-pointer w-fit mb-4'>
                <Xmark className={'text-white'}/>
            </div>
            <nav onClick={collapseSidebar} className="flex flex-col gap-y-3 text-white h-screen">
                <div className="flex items-center gap-x-4">
                    <UserIcon className={'text-red-800'}/>
                    <div>
                        {user &&
                            <NavLink to="/profile" className="hover:text-gray-400 transition">Profile</NavLink>
                        }

                        {!user &&
                            <div>
                                <NavLink className="hover:text-gray-400 transition" to="/login">LOGIN</NavLink>
                                <span className="px-1"> | </span>
                                <NavLink className="hover:text-gray-400 transition" to="/sign-up">SIGN UP</NavLink>
                            </div>
                        }
                    </div>
                </div>

                <NavLink className='flex items-center gap-x-4' to="/">
                    <HomeIcon className={'text-red-800'}/>
                    <span className='hover:text-gray-400 transition'>HOME</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/games">
                    <IoGameControllerOutline className='text-red-800 w-8 h-10'/>
                    <span className='hover:text-gray-400 transition'>GAMES</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/free-keys">
                    <FreeKeysIcon className={'text-red-800'}/>
                    <span className='hover:text-gray-400 transition'>FREE KEYS</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/groups">
                    <GroupsIcon className={'text-red-800'}/>
                    <span className='hover:text-gray-400 transition'>GROUPS</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/markets">
                    <MarketsIcon className={'text-red-800'}/>
                    <span className='hover:text-gray-400 transition'>MARKETS</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/protections">
                    <BsShieldExclamation className='text-red-800 w-8 h-10'/>
                    <span className='hover:text-gray-400 transition'>PROTECTIONS</span>
                </NavLink>

                <NavLink className='flex items-center gap-x-4' to="/forum">
                    <SiGotomeeting className='text-red-800 w-8 h-10'/>
                    <span className='hover:text-gray-400 transition'>FORUM</span>
                </NavLink>

                {user &&
                    <NavLink onClick={logout} className='flex items-center gap-x-4 mt-auto mb-2' to="/login">
                        <FiLogOut className='w-[30px] h-10 text-red-800'/>
                        <span className='hover:text-gray-400 transition'>LOGOUT</span>
                    </NavLink>
                }
            </nav>
        </div>
    )
}

export default Sidebar
