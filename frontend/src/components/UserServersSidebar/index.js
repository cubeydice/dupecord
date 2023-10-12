import React, { useState } from "react";
import { useSelector } from "react-redux";
import './UserServersSidebar.css'
import * as serverActions from "../../store/servers"

const UserServersSidebar = ({sessionUser}) => {
  const servers = useSelector(serverActions.getServers)
  console.log("Servers", servers)

  return (
    <>
      <div className="user-servers-sidebar">
        <ul>
          <li><img src={sessionUser.avatar_url} alt='profile-pic' className="server_icon"/></li>
          <hr/>
          {servers.map(server => {
            return <>
              <li>{server}</li>
            </>
          }
          )}

        </ul>

      </div>
    </>
  )
}

export default UserServersSidebar;