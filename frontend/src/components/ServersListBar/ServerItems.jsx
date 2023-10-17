import React from "react";
import './ServersSidebar.css'
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { handleImgError } from '../../App'

const ServerItems = ({server, imgNotFound}) => {
    const icon = server.serverIcon ?
        <img src={server.serverIcon}
        onError={handleImgError}
        alt={server.name}
        /> :
        <p>{server.name[0]}</p>

    return (
        <>
           <NavLink
           to={`/channels/${server.id}`}
           className="server-icon">
                {icon}
           </NavLink>
        </>
    )
}

export default ServerItems;