import {NavLink} from "react-router-dom";
import SearchIcon from "../icons/SearchIcon.jsx";
import MenuIcon from "../icons/MenuIcon.jsx";
import UsersIcon from "../icons/UsersIcon.jsx";
import InboxIcon from "../icons/InboxIcon.jsx";
import NotificationIcon from "../icons/NotificationIcon.jsx";
import UserIcon from "../icons/UserIcon.jsx";
import LogoIcon from "../icons/LogoIcon.jsx";

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 text-white max-h-16 bg-black bg-opacity-60">
            <div className="flex">
                <MenuIcon className={'cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                <SearchIcon className={'hidden sm:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
                <UsersIcon className={'hidden sm:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out'}/>
            </div>
            <div className="flex items-center justify-center">
                <div className="hidden sm:block">
                    <NavLink to="/games" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GAMES</NavLink>
                    <NavLink to="/nfos" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">NFOS</NavLink>
                    <NavLink to="/groups" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GROUPS</NavLink>
                    <NavLink to="/protections" className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">PROTECTIONS</NavLink>
                </div>
                <div className="mx-6">
                    <NavLink to="/" className="relative">
                        <LogoIcon className={'mt-5'}/>
                        <div className="cursor-auto" style={{
                            borderLeft: '65px solid transparent',
                            borderRight: '65px solid transparent',
                            borderTop: '36.6px solid rgba(0,0,0,.6)',
                            position: 'absolute',
                            right: '50%',
                            top: '85%',
                            transform: 'translateX(50%)',
                            zIndex: '-1'
                        }}></div>
                    </NavLink>
                </div>
                <div className="hidden sm:block">
                    <NavLink to="/markets" className="mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">MARKETS</NavLink>
                    <NavLink to="/free-keys" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">FREE KEYS</NavLink>
                    <NavLink to="/get-karma" className="hidden lg:inline-block mx-2 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GET KARMA</NavLink>
                    <NavLink to="/forum" className="hidden xl:inline-block mx-2 cursor-pointer hover:text-gray-400" transition duration-100 ease-in-out>FORUM</NavLink>
                </div>
            </div>
            <div className="flex">
                <NavLink to="/messages">
                    <InboxIcon className="hidden sm:inline-block mx-2 hover:text-gray-400 transition duration-100 ease-in-out"/>
                </NavLink>
                <NotificationIcon className="hidden sm:inline-block mx-2 hover:text-gray-400 transition duration-100 ease-in-out"/>
                <NavLink to="/login">
                    <UserIcon className="hover:text-gray-400 transition duration-100 ease-in-out"/>
                </NavLink>
            </div>
        </nav>
    );

}

export default Navbar;