import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ServersSidebar.css'
import { fetchServers, getServers } from "../../store/servers";
import ServerItems from "./ServerItems";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const ServersSidebar = ({sessionUser}) => {
  const dispatch = useDispatch();
  const serversObj = useSelector(getServers);
  const servers = serversObj ? Object.values(serversObj) : [];

  console.log(servers)
  useEffect(() => {
    dispatch(fetchServers())
  }, [dispatch])

  return (
    <>
      <nav className="user-servers-sidebar" id='servers-sidebar'>
        <NavLink to='@me'><img src={sessionUser.avatar_url} alt='profile-pic' className="server-icon"/></NavLink>
          <hr/>
          {servers.map(server => {
            return <ServerItems server={server} key={server.id}/>
          })}
      </nav>
    </>
  )
}

export default ServersSidebar;