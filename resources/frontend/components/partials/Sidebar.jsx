import React from 'react'
import {NavLink} from 'react-router-dom'
import {BiUserCircle} from 'react-icons/bi'
import {HiXMark} from 'react-icons/hi2'
import {IoGameControllerOutline} from 'react-icons/io5'
import {GiPirateFlag} from 'react-icons/gi'
import {BsShieldExclamation} from 'react-icons/bs'
import {AiOutlineHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import { useAuth } from '../api/AuthContext'
import {BsGift} from 'react-icons/bs'
import {HiOutlineShoppingBag} from 'react-icons/hi2'
import {GiCreditsCurrency} from 'react-icons/gi'


function Sidebar(props) {

    const {user} = useAuth();
    const sidebarRef = React.useRef(null)

    React.useEffect(() => {

        // Function to handle clicks on the document
        const handleClickOutside = (event) => {
            if (
                props.sidebarPopup &&
                !document.getElementById("sidebar-slide").contains(event.target) &&
                !document.getElementsByClassName("sidebar-popup")[0].contains(event.target) &&
                !document.getElementById("sidebar-menu-icon").contains(event.target)
            )
                props.setSidebarPopup(false);
        };

        // Add the event listener when the component mounts
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [props.sidebarPopup]);

    return (

            <div id='sidebar-slide' ref={sidebarRef} className={`fixed top-0 ${props.sidebarPopup ? 'left-0' : '-left-72'} sidebar-popup flex h-screen w-64 flex-col pt-6 transition-all z-[51] xl:w-72`}>
                <div className='mb-4 w-full px-6'>
                    <HiXMark onClick={props.toggleSidebar} className='w-6 h-6 text-white cursor-pointer'/>
                </div>
                <nav  className="flex h-screen flex-col gap-y-3 px-6 text-white bg-app-black/70">
                    <div className={`flex items-center gap-x-4 transform hover:translate-x-2 transition ${user ? 'group cursor-pointer' : ''}`}>
                        <BiUserCircle className='w-8 h-8 text-red-800'/>
                        <div>
                            {user &&
                                <NavLink onClick={()=> props.setSidebarPopup(false)} to="/profile" className="transition group-hover:text-[#ff0000]">PROFILE</NavLink>
                            }

                            {!user &&
                                <div>
                                    <NavLink onClick={()=> props.setSidebarPopup(false)} className="transition hover:text-[#ff0000]" to="/login">LOGIN</NavLink>
                                    <span className="px-1"> | </span>
                                    <NavLink onClick={()=> props.setSidebarPopup(false)} className="transition hover:text-[#ff0000]" to="/signup">SIGN UP</NavLink>
                                </div>
                            }
                        </div>
                    </div>

                    <NavLink onClick={()=> props.setSidebarPopup(false)} className='flex items-center gap-x-4 transform hover:translate-x-2 transition group' to="/">
                        <AiOutlineHome className='h-10 w-8 text-red-800'/>
                        <span className='transition group-hover:text-[#ff0000]'>HOME</span>
                    </NavLink>

                    <NavLink onClick={()=> props.setSidebarPopup(false)} className='flex items-center gap-x-4 transform hover:translate-x-2 transition group' to="/games">
                        <IoGameControllerOutline className='h-10 w-8 text-red-800'/>
                        <span className='transition group-hover:text-[#ff0000]'>GAMES</span>
                    </NavLink>

                    <NavLink onClick={()=> props.setSidebarPopup(false)} className='flex items-center gap-x-4 transform hover:translate-x-2 transition group' to="/groups">
                        <GiPirateFlag className='h-10 w-8 text-red-800'/>
                        <span className='transition group-hover:text-[#ff0000]'>GROUPS</span>
                    </NavLink>

                    <NavLink onClick={()=> props.setSidebarPopup(false)} className='flex items-center gap-x-4 transform hover:translate-x-2 transition group' to="/protections">
                        <BsShieldExclamation className='h-10 w-8 text-red-800'/>
                        <span className='transition group-hover:text-[#ff0000]'>PROTECTIONS</span>
                    </NavLink>

                    <div className='flex items-center gap-x-4 cursor-not-allowed hover:text-red-[#ff0000] group' to="/markets">
                        <HiOutlineShoppingBag className='h-10 w-8 text-red-800'/>
                        <span className='transition font-bold'>MARKETS</span>
                    </div>

                    <div className='flex items-center gap-x-4 cursor-not-allowed hover:text-red-[#ff0000] group' to="/markets">
                        <BsGift className="h-10 w-8 text-red-800"/>
                        <span className='transition font-bold'>FREE GAMES</span>
                    </div>

                    <div className='flex items-center gap-x-4 cursor-not-allowed hover:text-red-[#ff0000] group' to="/markets">
                        <GiCreditsCurrency className='h-10 w-8 text-red-800'/>
                        <span className='transition font-bold'>POINTS</span>
                    </div>

                    {user &&
                        <NavLink className='mt-auto mb-2 flex transform hover:translate-x-2 transition items-center gap-x-4 group' to="/logout">
                            <FiLogOut className='h-10 text-red-800 w-[30px]'/>
                            <span className='transition group-hover:text-[#ff0000] font-bold'>LOGOUT</span>
                        </NavLink>
                    }
                </nav>
            </div>
        )



}

export default Sidebar
