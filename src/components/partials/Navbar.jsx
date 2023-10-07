import { NavLink, Route } from "react-router-dom";

function Navbar() {
    return (
        <nav className="flex justify-between items-center px-6 text-white max-h-16 bg-black bg-opacity-60">
            <div className="flex">
                <div className="cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" width="30px">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                    </svg>
                </div>
                <div className="ml-3 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" width="30px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </div>
                <div className="ml-3 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" width="30px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                </div>
            </div>
            <div className="flex items-center">
                <NavLink to="/games" className="mr-6 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GAMES</NavLink>
                <NavLink to="/nfos" className="mr-6 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">NFOS</NavLink>
                <NavLink to="/groups" className="mr-6 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GROUPS</NavLink>
                <NavLink to="/protections" className="cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">PROTECTIONS</NavLink>
                <div className="mx-8" style={{ padding:'1px' }}>
                    <NavLink to="/" className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="70" width="80px" viewBox="0 0 420 450" className="mt-5">
                            <g>
                            <path className="logo-path2" fillOpacity="0" strokeWidth="5" stroke="#ED1C24" d="M147,383.5 147,341.9 64.3,294.1 64.3,125.9 64.3,125.9 210,41.7 219,46.9 219,352.3 255,331.5 280,239.8 301.7,304.5 337.7,283.7 337.7,136.3 301.7,115.5 301.7,228 280,166.5 255,228 255,26.2 210,0.2 28.3,105.1 28.3,314.9 147,383.5"></path>
                            <path className="logo-path1" fillOpacity="0" strokeWidth="5" stroke="#ED1C24" d="M273,36.5 273,78.1 355.7,125.9 355.7,294.1 210,378.3 201,373.1 201,310.7 118.3,263 118.3,157 201,109.3 201,67.7 82.3,136.3 82.3,283.7 165,331.5 165,393.8 210,419.8 391.7,314.9 391.7,105.1z"></path>
                            </g>
                        </svg>
                        <div className="cursor-auto" style={{borderLeft:'65px solid transparent', borderRight:'65px solid transparent', borderTop:'36.6px solid rgba(0,0,0,.6)', position:'absolute', right:'50%', top:'85%', transform: 'translateX(50%)', zIndex:'-1'}}></div>
                    </NavLink>
                </div>
                <NavLink to="/markets" className="cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">MARKETS</NavLink>
                <NavLink to="/free-keys" className="ml-6 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">FREE KEYS</NavLink>
                <NavLink to="/get-karma" className="ml-6 cursor-pointer hover:text-gray-400 transition duration-100 ease-in-out">GET KARMA</NavLink>
                <NavLink to="/forum" className="ml-6 cursor-pointer hover:text-gray-400" transition duration-100 ease-in-out>FORUM</NavLink>
            </div>
            <div className="flex">
                <NavLink to="/messages"  className="mr-3 hover:text-gray-400 transition duration-100 ease-in-out">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" width="30px">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                    </div>
                </NavLink>
                <div className="mr-3 hover:text-gray-400 transition duration-100 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" width="30px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                </div>
                <NavLink to="/login">
                    <div className="login-icon hover:text-gray-400 transition duration-100 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="40px" width="30px">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </NavLink>
            </div>
        </nav>
    );

}
// className="w-6 h-6"
export default Navbar;
