import {Link, NavLink, useLocation} from "react-router-dom";
import React from "react";
import SearchIcon from "../icons/SearchIcon.jsx";
import MenuIcon from "../icons/MenuIcon.jsx";
import UsersIcon from "../icons/UsersIcon.jsx";
import InboxIcon from "../icons/InboxIcon.jsx";
import NotificationIcon from "../icons/NotificationIcon.jsx";
import UserIcon from "../icons/UserIcon.jsx";
import Sidebar from "./Sidebar.jsx";

function Navbar() {
    return (
        <>
            <nav className="flex justify-between items-center px-1 md:px-6 text-white max-h-16 bg-black bg-opacity-60">
                <div className="flex">
                    <MenuIcon onClick={()=>{ document.querySelector('#sidebar').style.left = '0';}} className={'cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                    <SearchIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                    <UsersIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                </div>
                <div className="flex items-center justify-center">
                    <div className="hidden sm:block">
                        <NavLink to="/games" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GAMES</NavLink>
                        <NavLink to="/nfos" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">NFOS</NavLink>
                        <NavLink to="/groups" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GROUPS</NavLink>
                        <NavLink to="/protections" className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">PROTECTIONS</NavLink>
                    </div>
                    <div className="mx-3 md:mx-6">
                        <NavLink to="/" className="relative">
                            <img src="/public/logo.png" className="w-16 h-16 mt-10" alt="Logo" />
                            <div className="cursor-auto w-[10rem] h-[10rem] absolute bg-[#101012]" style={{
                                top: '-40%',
                                left: '-75%',
                                zIndex: '-1',
                                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                            }}></div>
                        </NavLink>
                    </div>
                    <div className="hidden sm:block">
                        <NavLink to="/markets" className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">MARKETS</NavLink>
                        <NavLink to="/free-keys" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">FREE KEYS</NavLink>
                        <NavLink to="/get-karma" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GET KARMA</NavLink>
                        <NavLink to="/forum" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400">FORUM</NavLink>
                    </div>
                </div>
                <div className="flex">
                    <NavLink to="/messages">
                        <InboxIcon className="mx-2 hover:text-gray-400 transition duration-100 ease-in-out"/>
                    </NavLink>
                    <NotificationIcon className="mx-2 hover:text-gray-400 transition duration-100 ease-in-out"/>
                    <NavLink to="/login">
                        <UserIcon className="hover:text-gray-400 transition duration-100 ease-in-out"/>
                    </NavLink>
                </div>
            </nav>
            <Sidebar />
        </>
    );

}

export default Navbar;
