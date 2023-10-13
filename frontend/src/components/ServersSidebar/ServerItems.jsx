import React from "react";
import './ServersSidebar.css'
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom";

const ServerItems = ({server}) => {
    const icon = server.serverIcon ? <img src={server.serverIcon} alt={server.name}/> : <p>{server.name[0]}</p>

    return (
        <>
           <NavLink
           to={`${server.id}`}
           className="server-icon">
                {icon}
           </NavLink>
        </>
    )
}

export default ServerItems;