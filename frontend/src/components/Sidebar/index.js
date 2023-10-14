import React from "react";
import './Sidebar.css'
import ProfileBar from "./ProfileBar";
import ServerButton from "./ServerButton";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Sidebar = ({sessionUser}) => {
  const { serverId, channelId } = useParams();
  console.log("server id",serverId, channelId)

  return (
    <>
      <div className="sidebar">
      {(serverId !== "@me" && serverId !== null) ? <ServerButton serverId={serverId}/> : ""}
      <nav className="sidebar-nav">
        ChannelCategories
        ChannelItems
      </nav>
      <ProfileBar sessionUser={sessionUser}/>
      </div>
    </>
  )
}

export default Sidebar;