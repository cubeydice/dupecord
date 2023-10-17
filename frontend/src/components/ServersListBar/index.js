import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ServersSidebar.css'
import { fetchServers, getServers } from "../../store/servers";
import ServerItems from "./ServerItems";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom";
import CreateServerButton from "./CreateServerButton";

const ServersSidebar = ({sessionUser}) => {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const serversObj = useSelector(getServers);
  const servers = serversObj ? Object.values(serversObj) : [];

  useEffect(() => {
    dispatch(fetchServers())
  }, [dispatch, serverId])

  return (
    <>
      <nav className="user-servers-sidebar" id='servers-sidebar'>
        <NavLink to='/channels/@me' className="server-icon"><img src={sessionUser.avatar_url} alt='profile-pic'/></NavLink>
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