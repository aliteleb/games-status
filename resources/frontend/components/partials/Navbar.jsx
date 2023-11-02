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
import {HiOutlineMail} from 'react-icons/hi'
import {CgProfile} from 'react-icons/cg'
import {GoSignOut} from 'react-icons/go'


function Navbar() {
    const {user} = useAuth();
    const [showProfilePopup, setShowProfilePopup] = React.useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = React.useState(false);

    React.useEffect(() => {
        // Function to handle clicks on the document
        const handleClickOutside = (event) => {
            if (
                showProfilePopup &&
                !document.getElementById("user-dropdown").contains(event.target) &&
                !document.getElementsByClassName("avatar-popup")[0].contains(event.target)
            )
                setShowProfilePopup(false);

            if (
                showProfilePopup &&
                !document.getElementById("notification-dropdown").contains(event.target) &&
                !document.getElementsByClassName("notification-popup")[0].contains(event.target)
            )
                setShowNotificationPopup(false);

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
            <nav className="fixed z-50 grid w-full items-center px-1 text-white backdrop-blur-xl grid-cols-[1fr_auto_1fr] bg-app-black/70 md:px-6">
                <div className="flex items-center" id="left-nav">
                    <MenuIcon onClick={() => {
                        document.getElementById('sidebar').style.left = '0';
                        document.getElementById('left-nav').style.opacity = '0';
                    }} className={'cursor-pointer hover:text-gray-400 transition'}/>
                    <Link to="/games">
                        <SearchIcon className={'mx-2 cursor-pointer hover:text-gray-400 transition'}/>
                    </Link>

                </div>

                <div className="grid items-center justify-center grid-cols-[auto_1fr_auto] h-[4rem] sm:grid-cols-[1fr_auto_1fr]">
                    <div className="hidden text-end sm:block">
                        <NavLink onClick={collapseSidebar} to="/games" className="mx-2 hidden cursor-pointer transition hover:text-gray-400 xl:inline-block">GAMES</NavLink>
                        <NavLink onClick={collapseSidebar} to="/groups" className="mx-2 hidden cursor-pointer transition hover:text-gray-400 lg:inline-block">GROUPS</NavLink>
                        <NavLink onClick={collapseSidebar} to="/protections" className="mx-2 cursor-pointer transition hover:text-gray-400">PROTECTIONS</NavLink>
                    </div>
                    <div className="mx-3 md:mx-6">
                        <NavLink onClick={collapseSidebar} to="/" className="relative">
                            <img src="/assets/images/logo.png" className="relative top-5 h-16 w-16 animate-glow" alt="Logo"/>
                            <div className="absolute cursor-auto w-[10rem] h-[10rem] bg-app-black/70" style={{
                                top: '-100%',
                                left: '-75%',
                                zIndex: '-1',
                                clipPath: 'polygon(90% 80%, 70% 100%, 30% 100%, 10% 80%)'
                            }}></div>
                        </NavLink>
                    </div>
                    <div className="hidden sm:block">
                        <span onClick={collapseSidebar} className="mx-2 cursor-not-allowed transition hover:text-gray-400 font-bold">FREE GAMES</span>
                        <span onClick={collapseSidebar} className="mx-2 hidden cursor-not-allowed transition hover:text-gray-400 lg:inline-block font-bold">POINTS</span>
                        <span onClick={collapseSidebar} className="mx-2 hidden cursor-not-allowed hover:text-gray-400 xl:inline-block font-bold">MARKET</span>
                    </div>
                </div>

                <div className="flex items-center justify-end">

                    {user &&
                        <NotificationIcon onClick={() => {
                            setShowNotificationPopup(!showNotificationPopup)
                        }} id="notification-dropdown"
                             className={`mx-2 hover:text-gray-200 transition w-8 h-8 rounded-full cursor-pointer ${showNotificationPopup ? 'text-gray-200' : 'text-gray-300'}`}
                             src={`${user.avatar}`} alt={'avatar'} width={100} height={100}/>
                    }
                    {!user &&
                        <Link to="/login">
                            <NotificationIcon className="mx-2 transition hover:text-gray-400"/>
                        </Link>
                    }

                    {user &&
                        <img onClick={() => {
                            setShowProfilePopup(!showProfilePopup)
                        }} id="user-dropdown"
                             className={`border-2 hover:border-gray-500 transition w-10 h-10 rounded-full cursor-pointer ${showProfilePopup ? 'border-gray-500' : 'border-gray-600'}`}
                             src={`${user.avatar}`} alt={'avatar'} width={100} height={100}/>
                    }
                    {!user &&
                        <Link to="/login">
                            <UserIcon className="mx-2 transition hover:text-gray-400"/>
                        </Link>
                    }
                </div>
            </nav>
            <div className={`${!showProfilePopup ? 'hidden' : 'animate-slide-down'} avatar-popup z-50 w-48 my-4 text-base list-none divide-y rounded-lg shadow bg-black/60 divide-gray-600 fixed right-[.7rem] top-[3.2rem]`}
                id="user-dropdown">
                <div className="px-4 py-3 hover:bg-neutral-700/30 rounded-t-lg">
                    <Link onClick={() => setShowProfilePopup(false)} to={`/user/${user?.username}`}>
                        <span className="block text-center text-sm text-gray-400">
                            @{user?.username}
                        </span>
                        <span className="mt-1 block truncate text-center text-sm text-gray-400">
                            <HiOutlineMail className="mx-1 inline h-5 w-5 text-gray-400 "/>
                            {user?.email}
                        </span>
                    </Link>
                </div>
                <ul className="" aria-labelledby="user-menu-button">
                    <li>
                        <NavLink onClick={() => setShowProfilePopup(false)} to="/profile"
                                 className="block py-2 text-left text-sm text-gray-400 hover:bg-neutral-700/30">
                                 <CgProfile className="mx-2 inline h-5 w-5 text-gray-400"/>
                                 Profile Settings
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={() => setShowProfilePopup(false)} to="/logout"
                                 className="block py-2 text-sm text-gray-400 hover:bg-neutral-700/30 rounded-b-lg">
                                 <GoSignOut className="mx-2 inline h-5 w-5 text-gray-400"/>
                                 Sign out
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className={`${!showNotificationPopup ? 'hidden' : 'animate-slide-down'} notification-popup z-50 w-48 my-4 text-base list-none divide-y rounded-lg shadow bg-black/60 divide-gray-600 fixed right-[.7rem] top-[3.2rem]`}
                 id="notification-dropdown">
                <div>Notification 1</div>
                <div>Notification 2</div>
                <div>Notification 3</div>
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
