import React, { useEffect } from "react";
import './Sidebar.css'
import ProfileBar from "./ProfileBar";
import ServerButton from "./ServerButton";
import ChannelsList from "./ChannelsList";
import { useDispatch } from "react-redux";
import { fetchServer } from "../../../store/servers";

const Sidebar = ({sessionUser, serverId, server}) => {

  const dispatch = useDispatch();

  useEffect(()=>{ if (serverId !== "@me") dispatch(fetchServer(serverId))}, [dispatch, serverId])

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