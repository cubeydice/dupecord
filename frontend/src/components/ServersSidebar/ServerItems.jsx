import React, { useEffect } from "react";
import './ServersSidebar.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const ServerItems = ({server}) => {

    return (
        <>
           <NavLink to={`${server.id}`} className="server-icon"><img src={server.serverIcon} alt={server.name}/></NavLink>
        </>
    )
}

export default ServerItems;