import React, { useEffect } from "react";
import './ServersSidebar.css'

const ServerItems = ({server}) => {

    let icon;
    if (server.serverIcon) {
        icon = <input type="image" src={server.serverIcon} alt={server.name} className="server-icon"/>
        // icon = <button className="server-icon"></button>
    } else {
        icon = <input type="button" value={server.name[0]} className="server-icon"></input>
    }

    return (
        <>
           {icon}
        </>
    )
}

export default ServerItems;