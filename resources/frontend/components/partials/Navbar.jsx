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
    const [showProfilePopup, setShowProfilePopup] = React.useState(false);

    React.useEffect(() => {
        // Function to handle clicks on the document
        const handleClickOutside = (event) => {
            // Check if the click target is not within the user-dropdown and not the avatar button
            if (
                showProfilePopup &&
                !document.getElementById("user-dropdown").contains(event.target) &&
                !document.getElementsByClassName("avatar-popup")[0].contains(event.target)
            ) {
                setShowProfilePopup(false);
            }
        };

        // Add the event listener when the component mounts
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showProfilePopup]);

    return (
        <>
            <nav className="fixed w-full z-50 grid grid-cols-[1fr_auto_1fr] px-1 md:px-6 text-white bg-app-black/70 items-center backdrop-blur-xl ">
                <div className="flex items-center" id="left-nav">
                    <MenuIcon onClick={() => {
                        document.getElementById('sidebar').style.left = '0';
                        document.getElementById('left-nav').style.opacity = '0';
                    }} className={'cursor-pointer hover:text-gray-400 transition'}/>
                    <Link to="/games">
                        <SearchIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition'}/>
                    </Link>
                    <UsersIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition'}/>
                </div>

                <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center justify-center h-[4rem]">
                    <div className="hidden sm:block text-end">
                        <NavLink onClick={collapseSidebar} to="/games" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400 transition">GAMES</NavLink>
                        <NavLink onClick={collapseSidebar} to="/groups" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition">GROUPS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/protections" className="mx-2 cursor-pointer hover:text-gray-400 transition">PROTECTIONS</NavLink>
                    </div>
                    <div className="mx-3 md:mx-6">
                        <NavLink onClick={collapseSidebar} to="/" className="relative">
                            <img src="/assets/images/logo.png" className="w-16 h-16 top-5 relative animate-glow" alt="Logo"/>
                            <div className="cursor-auto w-[10rem] h-[10rem] absolute bg-app-black/70" style={{
                                top: '-100%',
                                left: '-75%',
                                zIndex: '-1',
                                clipPath: 'polygon(90% 80%, 70% 100%, 30% 100%, 10% 80%)'
                            }}></div>
                        </NavLink>
                    </div>
                    <div className="hidden sm:block">
                        <NavLink onClick={collapseSidebar} to="/free-games" className="mx-2 cursor-pointer hover:text-gray-400 transition">FREE GAMES</NavLink>
                        <NavLink onClick={collapseSidebar} to="/points" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition">POINTS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/market" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400">MARKET</NavLink>
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
                        <img onClick={() => {
                            setShowProfilePopup(!showProfilePopup)
                        }} id="user-dropdown"
                             className={`border-2 hover:border-gray-500 transition w-10 h-10 rounded-full cursor-pointer ${showProfilePopup ? 'border-gray-500' : 'border-gray-600'}`}
                             src={`${user.avatar}`} alt={'avatar'} width={100} height={100}/>
                    }
                    {!user &&
                        <NavLink to="/login">
                            <UserIcon className="hover:text-gray-400 transition mx-2"/>
                        </NavLink>
                    }
                </div>
            </nav>
            <div
                className={`${!showProfilePopup ? 'hidden' : 'animate-slide-down'} avatar-popup z-50 w-48 my-4 text-base list-none divide-y rounded-lg shadow bg-black/60 divide-gray-600 fixed right-[.7rem] top-[3.2rem]`}
                id="user-dropdown">
                <div className="px-4 py-3">
                    <Link onClick={() => setShowProfilePopup(false)} to={`/user/${user?.username}`}>
                        <span className="block text-sm text-gray-900 dark:text-white">{user?.username}</span>
                        <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user?.email}</span>
                    </Link>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <NavLink onClick={() => setShowProfilePopup(false)} to="/profile"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile Settings</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => setShowProfilePopup(false)} to="/logout"
                                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign
                            out</NavLink>
                    </li>
                </ul>
            </div>
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
