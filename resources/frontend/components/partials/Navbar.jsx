import {Link, NavLink} from "react-router-dom";
import React from "react";
import SearchIcon from "../icons/SearchIcon.jsx";
import MenuIcon from "../icons/MenuIcon.jsx";
import UsersIcon from "../icons/UsersIcon.jsx";
import InboxIcon from "../icons/InboxIcon.jsx";
import NotificationIcon from "../icons/NotificationIcon.jsx";
import UserIcon from "../icons/UserIcon.jsx";
import Sidebar, {collapseSidebar} from "./Sidebar.jsx";
import {useAuth} from "../api/AuthContext.jsx";
import NotificationsBar from './NotificationsBar.jsx'
import {Toaster} from "react-hot-toast";

function Navbar() {
    const {user} = useAuth();

    return (
        <>
            <nav className="fixed w-full z-50 grid grid-cols-[1fr_auto_1fr] px-1 md:px-6 text-white bg-app-black/70 items-center backdrop-blur-xl">
                <div className="flex items-center" id="left-nav">
                    <MenuIcon onClick={() => {
                        document.getElementById('sidebar').style.left = '0';
                        document.getElementById('left-nav').style.opacity = '0';
                    }} className={'cursor-pointer hover:text-gray-400 transition'}/>
                    <Link to="/search-game">
                        <SearchIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition'}/>
                    </Link>
                    <UsersIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition'}/>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center justify-center h-[4rem]">
                    <div className="hidden sm:block text-end">
                        <NavLink onClick={collapseSidebar} to="/search-game" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400 transition">GAMES</NavLink>
                        <NavLink onClick={collapseSidebar} to="/nfos" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition">NFOS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/groups" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition">GROUPS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/protections" className="mx-2 cursor-pointer hover:text-gray-400 transition">PROTECTIONS</NavLink>
                    </div>
                    <div className="mx-3 md:mx-6">
                        <NavLink onClick={collapseSidebar} to="/" className="relative">
                            <img src="/assets/images/logo.png" className="w-16 h-16 top-5 relative" alt="Logo"/>
                            <div className="cursor-auto w-[10rem] h-[10rem] absolute bg-app-black/70" style={{
                                top: '-100%',
                                left: '-75%',
                                zIndex: '-1',
                                clipPath: 'polygon(90% 80%, 70% 100%, 30% 100%, 10% 80%)'
                            }}></div>
                        </NavLink>
                    </div>
                    <div className="hidden sm:block">
                        <NavLink onClick={collapseSidebar} to="/markets" className="mx-2 cursor-pointer hover:text-gray-400 transition  ">MARKETS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/free-keys" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition  ">FREE
                            KEYS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/get-karma" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition  ">GET
                            KARMA</NavLink>
                        <NavLink onClick={collapseSidebar} to="/forum" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400">FORUM</NavLink>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <NavLink to="/messages">
                        <InboxIcon className="mx-2 hover:text-gray-400 transition  "/>
                    </NavLink>
                    <div onClick={() => document.querySelector('#notifications-bar').style.right = '0'}>
                        <NotificationIcon className="mx-2 cursor-pointer hover:text-gray-400 transition  "/>
                    </div>

                    {user &&
                        <span className="border-[2px] hover:border-gray-300 transition  w-12 flex justify-center items-center h-12 p-2 rounded-full cursor-pointer border-gray-400">{
                            <h1>img</h1>}</span>}
                    {!user &&
                        <NavLink to="/login">
                            <UserIcon className="hover:text-gray-400 transition  "/>
                        </NavLink>
                    }
                </div>
            </nav>
            <Sidebar/>
            <NotificationsBar/>
            <Toaster containerStyle={{top: 100}} toastOptions={{
                position: "top-center",
                className: '',
                duration: 2000,
                style: {
                    background: '#101010',
                    color: '#ddd',
                    border: '1px solid #222',
                },
                success: {
                    iconTheme: {
                        primary: '#090',
                        secondary: 'black',
                    },
                },

            }
            }/>
        </>
    );

}

export default Navbar;
