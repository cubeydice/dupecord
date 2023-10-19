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
  }, [dispatch])

  return (
    <>
      <nav className="user-servers-sidebar" id='servers-sidebar'>
        <NavLink to='/channels/@me' className="server-icon">
          <img src={sessionUser.avatar_url}
          onError={handleImgError}
          alt='profile-pic'/>
        </NavLink>

        <hr/>

        {servers.map(server => {
          return <ServerItems server={server} key={server.id}/>
        })}

        <CreateServerButton sessionUser={sessionUser}/>
      </nav>
    </>
  )
}

export default ServersSidebar;