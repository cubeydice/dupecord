import React from "react";
import './Sidebar.css'
import ProfileBar from "./ProfileBar";
import ServerButton from "./ServerButton";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import ChannelsList from "./ChannelsList";
import { useSelector } from "react-redux";
import { getServer } from "../../store/servers";

const Sidebar = ({sessionUser}) => {
  const serverId = useParams();
  const server = useSelector(getServer(serverId.serverId))

  return (
    <>
      <div className="sidebar">
        {(serverId !== "@me" && serverId !== null) ?
          <ServerButton server={server}/> : ""}

        <div className="sidebar-nav">
          {server ? <ChannelsList server={server}/> : "" }
        </div>

        <ProfileBar sessionUser={sessionUser}/>
      </div>
    </>
  )
}

export default Sidebar;