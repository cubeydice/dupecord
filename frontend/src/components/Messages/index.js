import React from "react";
import HeaderBar from "./HeaderBar";
import './Messages.css'

const Messages = ({serverId, server}) => {

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} server={server}/>
        ChannelBody / Messages / MessageItems
      </div>
    </>
  )
}

export default Messages;