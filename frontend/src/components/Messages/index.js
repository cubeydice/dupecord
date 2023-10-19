import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import './Messages.css'
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useDispatch } from "react-redux";
import { fetchServer } from "../../store/servers";

const Messages = () => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const [channels, setChannels] = useState({})

  useEffect(()=>{
    if (serverId !== '@me') dispatch(fetchServer(serverId))
    .then(res => setChannels(res.channels));
  }, [serverId, channelId])

  const channel = channels[channelId] || {}

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} channel={channel}/>
        ChannelBody / Messages / MessageItems
      </div>
    </>
  )
}

export default Messages;