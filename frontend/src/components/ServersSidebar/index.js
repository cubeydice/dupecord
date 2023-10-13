import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ServersSidebar.css'
import { fetchServers, getServers } from "../../store/servers";
import ServerItems from "./ServerItems";

const ServersSidebar = ({sessionUser}) => {
  const dispatch = useDispatch();
  const servers = useSelector(getServers);

  useEffect(() => {
    dispatch(fetchServers())
  }, [dispatch])

  console.log("servers",servers)
  return (
    <>
      <div className="user-servers-sidebar">
        <ul>
          <li><img src={sessionUser.avatar_url} alt='profile-pic' className="server-icon"/></li>
          <hr/>
          {servers.map(server => {
            return <li><ServerItems server={server} key={server.id}/></li>
          })}
        </ul>

      </div>
    </>
  )
}

export default ServersSidebar;