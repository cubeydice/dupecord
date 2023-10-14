import React from "react";
import './Sidebar.css'
import ProfileBar from "./ProfileBar";
import ServerButton from "./ServerButton";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Sidebar = ({sessionUser}) => {
  const { serverId } = useParams();


  return (
    <>
      <div className="sidebar">
      {(serverId !== "@me") ? <ServerButton serverId={serverId}/> : ""}
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