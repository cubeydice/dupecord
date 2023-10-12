import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './UserServersSidebar.css'
import * as serverActions from "../../store/servers"

const UserServersSidebar = () => {
  const dispatch = useDispatch();
  const servers = useSelector(serverActions.getServers)
  console.log("Servers", servers)

  return (
    <>
      <div className="user-servers-sidebar">
        hi askdfjnsldkf
        {servers.map(server => {
          return <>
            <li>{server}</li>
          </>
        }
          )}
      </div>
    </>
  )
}

export default UserServersSidebar;