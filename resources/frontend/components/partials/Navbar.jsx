import { Link, NavLink } from "react-router-dom";
import React from "react";
import { BsSearch } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiNotification2Line } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import Sidebar from "./Sidebar.jsx";
import { useAuth } from "../api/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import { HiOutlineMail } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { GoSignOut } from "react-icons/go";
import Notifications from "../layouts/Notifications.jsx";
import {RiNotificationOffFill} from 'react-icons/ri'


function Navbar() {
    const { user } = useAuth();
    const [showProfilePopup, setShowProfilePopup] = React.useState(false);
    const [showNotificationPopup, setShowNotificationPopup] = React.useState(false);
    const [notificationsCount, setNotificationsCount] = React.useState(null);
    const [unReadNotificationsCount, setUnReadNotificationsCount] = React.useState(null);
    const [sidebarPopup, setSidebarPopup] = React.useState(false)

    
    const toggleSidebar = () => {
        setSidebarPopup(!sidebarPopup)
    }


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
                showNotificationPopup &&
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
    }, [showProfilePopup, showNotificationPopup]);

    return (
        <>
            <nav className="fixed z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center bg-app-black/70 px-1 text-white backdrop-blur-xl md:px-6">
                <div className={`flex items-center ${sidebarPopup && 'opacity-0 pointer-events-none'}`} id="left-nav">
                    <RxHamburgerMenu id="sidebar-menu-icon" onClick={()=> setSidebarPopup(true)} className={"h-6 w-6 cursor-pointer transition hover:text-gray-400"} />
                    <Link to="/games">
                        <BsSearch className={"mx-4 h-6 w-6 cursor-pointer transition hover:text-gray-400"} />
                    </Link>

                </div>

                <div className="grid h-[4rem] grid-cols-[auto_1fr_auto] items-center justify-center sm:grid-cols-[1fr_auto_1fr]">
                    <div className="hidden text-end sm:block">
                        <NavLink to="/games" className="mx-2 hidden cursor-pointer transition hover:text-[#ff0000] xl:inline-block">GAMES</NavLink>
                        <NavLink to="/groups" className="mx-2 hidden cursor-pointer transition hover:text-[#ff0000] lg:inline-block">GROUPS</NavLink>
                        <NavLink to="/protections" className="mx-2 cursor-pointer transition hover:text-[#ff0000]">PROTECTIONS</NavLink>
                    </div>
                    <div className="mx-3 md:mx-6">
                        <NavLink to="/" className="relative h-[50px]">
                            <img src="/public/assets/images/1.png" className="animate-glow relative top-4 object-cover h-16 w-20" alt="Logo" />
                            <div className="absolute h-[10rem] w-[10rem] cursor-auto bg-app-black/70" style={{
                                top: "-100%",
                                left: "-50%",
                                zIndex: "-1",
                                clipPath: "polygon(90% 80%, 70% 100%, 30% 100%, 10% 80%)"
                            }}></div>
                        </NavLink>
                    </div>
                    <div className="hidden sm:block">
                        <span className="mx-2 cursor-not-allowed font-bold transition">FREE GAMES</span>
                        <span className="mx-2 hidden cursor-not-allowed font-bold transition lg:inline-block">POINTS</span>
                        <span className="mx-2 hidden cursor-not-allowed font-bold xl:inline-block">MARKET</span>
                    </div>
                </div>

                <div className="flex items-center justify-end">

                    {user &&
                        <div className="relative">
                            <RiNotification2Line onClick={() => {
                                setShowNotificationPopup(!showNotificationPopup);
                            }}
                            id="notification-dropdown"
                            className={`border-2 border-gray-400 mx-4 transition p-2 w-9 h-9 rounded-t-full rounded-b-full cursor-pointer ${showNotificationPopup ? "md:border-red-700 md:rounded-b-none md:hover:border-red-700 md:text-red-700" : "border-gray-600 rounded-full hover:border-gray-400"}`}
                            src={`${user.avatar}`} alt={"avatar"} width={100} height={100} />
                            {unReadNotificationsCount === 0 || <div
                                className='absolute right-10 top-[-6px] flex h-5 w-5 items-center justify-center bg-red-800 text-xs rounded-full'>{unReadNotificationsCount}</div>}
                        </div>
                    }
                    {!user &&
                        <Link to="/login">
                            <RiNotification2Line className="mx-2 h-6 w-6 text-gray-300 transition hover:text-gray-400" />
                        </Link>
                    }

                    {user &&
                        <img onClick={() => {
                            setShowProfilePopup(!showProfilePopup);
                        }} id="user-dropdown"
                             className={`border-2 hover:border-gray-400 transition w-10 h-10 rounded-full cursor-pointer ${showProfilePopup ? "border-gray-400" : "border-gray-600"}`}
                             src={`${user.avatar}`} alt={"avatar"} width={100} height={100} />
                    }
                    {!user &&
                        <Link to="/login">
                            <BiUserCircle className="mx-2 h-8 w-8 text-gray-300 transition hover:text-gray-400" />
                        </Link>
                    }
                </div>
            </nav>
            <div
                className={`${!showProfilePopup ? "hidden " : "animate-slide-down"} avatar-popup z-50 w-72 my-4 text-base list-none rounded-lg shadow bg-black/60 fixed right-[.7rem] top-[3.2rem]`}
                id="user-dropdown">
                <div className="rounded-t-lg px-4 py-3 group hover:bg-neutral-700/30">
                    <Link onClick={() => setShowProfilePopup(false)} to={`/user/${user?.username}`}>
                        <span className="block text-center text-sm text-gray-400 group-hover:text-gray-300 transition">
                            @{user?.username}
                        </span>
                        <span className="mt-2 block truncate text-center text-sm text-gray-400 group-hover:text-gray-300 transition">
                            <HiOutlineMail className="mx-1 inline h-5 w-5 text-gray-400 group-hover:text-gray-300 transition" />
                            {user?.email}
                        </span>
                    </Link>
                </div>
                <ul className="border-t border-gray-500" aria-labelledby="user-menu-button">
                    <li className="group">
                        <NavLink onClick={() => setShowProfilePopup(false)} to="/profile"
                                 className="block py-2 text-left text-sm text-gray-400 hover:bg-neutral-700/30 hover:text-gray-300 transition ">
                            <CgProfile className="mx-2 inline h-5 w-5 text-gray-400 group-hover:text-gray-300 transition" />
                            Profile Settings
                        </NavLink>
                    </li>
                    <li className="group">
                        <NavLink onClick={() => setShowProfilePopup(false)} to="/logout"
                                 className="block rounded-b-lg py-2 text-sm text-gray-400 hover:bg-neutral-700/30 hover:text-gray-300 transition">
                            <GoSignOut className="mx-2 inline h-5 w-5 text-gray-400 group-hover:text-gray-300 transition" />
                            Sign out
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div
                className={`${!showNotificationPopup ? "hidden" : "animate-slide-down"} border border-red-800 rounded-tl-none rounded-tr-none notification-popup shadow-black flex rounded-md overflow-hidden flex-col z-50 w-full md:w-[47rem] mt-12 md:my-[-3.5px] md:mx-[4.60rem] text-gray-300 list-none shadow bg-[#1d1c1c] fixed md:right-[0.4rem] top-[3.2rem]`}
                id="notification-dropdown">
                <div className="flex h-10 items-center justify-center gap-x-3 bg-red-700">
                    Notifications
                    <div className="flex items-center justify-center rounded-full bg-red-950 px-3 py-[2px]">{notificationsCount}</div>
                </div>
                <div className={`${notificationsCount === 0 ? "flex justify-center items-center" : ""} max-h-[35rem] min-h-[5rem] overflow-x-hidden overflow-y-scroll`}>
                    {notificationsCount === 0 ?
                        <div className="text-gray-300 flex items-center gap-x-2">
                            <RiNotificationOffFill className="w-6 h-6"/>
                            There are no new notifications for you.
                        </div>:
                        <Notifications setShowNotificationPopup={setShowNotificationPopup} setUnReadNotificationsCount={setUnReadNotificationsCount} setNotificationsCount={setNotificationsCount} />
                    }
                </div>

            </div>
            <Sidebar toggleSidebar={toggleSidebar} setSidebarPopup={setSidebarPopup}  sidebarPopup={sidebarPopup}/>
            <Toaster containerStyle={{ top: 100 }} toastOptions={{
                position: "top-center",
                className: "",
                duration: 2000,
                style: {
                    background: "#101010",
                    color: "#ddd",
                    border: "1px solid #222"
                },
                success: {
                    iconTheme: {
                        primary: "#090",
                        secondary: "black"
                    }
                }

            }
            } />
        </>
    );

}

export default Navbar;
