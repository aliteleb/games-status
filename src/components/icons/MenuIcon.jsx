import React from "react";
import { sidebarContextApi } from "../../App";

export default function MenuIcon(props){

    let useContext = React.useContext(sidebarContextApi)

    return(
        <svg onClick={useContext.sidebarToggle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="40px" width="30px" {...props}>
            <path d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
    );
}