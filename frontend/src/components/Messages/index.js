import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import './Messages.css'
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { fetchServer } from "../../store/servers";

const Messages = ({channels}) => {
  const { serverId, channelId } = useParams();
  const channel = channels[channelId] || {}

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} channel={channel}/>
        <h1>Welcome to #{channel.name}!</h1>
        <p>This is the start of the #{channel.name} channel.</p>
      </div>
    </>
  )
}

export default Messages;