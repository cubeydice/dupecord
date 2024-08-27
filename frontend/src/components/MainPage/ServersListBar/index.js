import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers, getServers } from "../../../store/servers";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import ServerItems from "./ServerItems";
import CreateServerButton from "./CreateServerButton";
import { handleImgError } from "../../../App";
import './ServersSidebar.css'

const ServersSidebar = ({sessionUser}) => {
  const dispatch = useDispatch();
  const serversObj = useSelector(getServers);
  const servers = serversObj ? Object.values(serversObj) : [];

  useEffect(() => {
    dispatch(fetchServers())
  }, [dispatch, sessionUser])

  return (
    <>
      <nav className="user-servers-sidebar" id='servers-sidebar'>
        <NavLink to='/channels/@me' className="server-icon" id='me-icon'>
          <img src={sessionUser.avatarUrl}
          onError={handleImgError}
          alt='profile-pic'/>
        </NavLink>

        <hr/>
        <div className="server-list">
          {servers.map(server => {
            return <ServerItems server={server} key={server.id}/>
          })}

          <CreateServerButton sessionUser={sessionUser}/>
        </div>
      </nav>
    </>
  )
}

export default ServersSidebar;