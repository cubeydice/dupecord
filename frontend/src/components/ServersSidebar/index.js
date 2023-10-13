import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './ServersSidebar.css'
import { fetchServers, getServers } from "../../store/servers";

const ServersSidebar = ({sessionUser}) => {
  const dispatch = useDispatch();
  const servers = useSelector(getServers).servers;

  useEffect(() => {
  dispatch(fetchServers(servers))}
  , [dispatch])

  return (
    <>
      <div className="user-servers-sidebar">
        <ul>
          <li><img src={sessionUser.avatar_url} alt='profile-pic' className="server_icon"/></li>
          <hr/>
          {/* {servers.map(server => {
            return <>
              <li>{server}</li>
            </>
          }
          )} */}

        </ul>

      </div>
    </>
  )
}

export default ServersSidebar;