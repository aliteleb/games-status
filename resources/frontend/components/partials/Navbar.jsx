import {NavLink} from "react-router-dom";
import React from "react";
import SearchIcon from "../icons/SearchIcon.jsx";
import MenuIcon from "../icons/MenuIcon.jsx";
import UsersIcon from "../icons/UsersIcon.jsx";
import InboxIcon from "../icons/InboxIcon.jsx";
import NotificationIcon from "../icons/NotificationIcon.jsx";
import UserIcon from "../icons/UserIcon.jsx";
import Sidebar from "./Sidebar.jsx";
import {useAuth} from "../api/AuthContext.jsx";
import { collapseSidebar } from "./Sidebar.jsx";
import NotificationsBar from './NotificationsBar.jsx'

function Navbar() {
    const {user} = useAuth();
    console.log(user);
    return (
        <>
            <nav className="grid grid-cols-[1fr_auto_1fr] px-1 md:px-6 text-white bg-custom-black items-center">
                <div className="flex items-center">
                    <MenuIcon onClick={() => {
                        document.querySelector('#sidebar').style.left = '0';
                    }} className={'cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                    <SearchIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                    <UsersIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center justify-center h-[4rem]">
                    <div className="hidden sm:block text-end">
                        <NavLink onClick={collapseSidebar} to="/games" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GAMES</NavLink>
                        <NavLink onClick={collapseSidebar} to="/nfos" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">NFOS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/groups" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GROUPS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/protections" className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">PROTECTIONS</NavLink>
                    </div>
                    <div className="mx-3 md:mx-6">
                        <NavLink onClick={collapseSidebar} to="/" className="relative">
                            <img src="/assets/images/logo.png" className="w-16 h-16 top-5 relative" alt="Logo"/>
                            <div className="cursor-auto w-[10rem] h-[10rem] absolute bg-custom-black" style={{
                                top: '-100%',
                                left: '-75%',
                                zIndex: '-1',
                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                            }}></div>
                        </NavLink>
                    </div>
                    <div className="hidden sm:block">
                        <NavLink onClick={collapseSidebar} to="/markets" className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">MARKETS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/free-keys" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">FREE KEYS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/get-karma" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GET KARMA</NavLink>
                        <NavLink onClick={collapseSidebar} to="/forum" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400">FORUM</NavLink>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <NavLink to="/messages">
                        <InboxIcon className="mx-2 hover:text-gray-400 transition duration-100 ease-in-out"/>
                    </NavLink>
                    <div onClick={()=> document.querySelector('#notifications-bar').style.right = '0'}>
                        <NotificationIcon className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out"/>
                    </div>

                    {user && <span className="border-[1px] p-2 rounded border-gray-400">{user.username}</span>}
                    {!user &&
                        <NavLink to="/login">
                            <UserIcon className="hover:text-gray-400 transition duration-100 ease-in-out"/>
                        </NavLink>
                    }
                </div>
            </nav>
            <Sidebar/>
            <NotificationsBar/>
        </>
    );

}

export default Navbar;
