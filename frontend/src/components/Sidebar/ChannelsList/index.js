import React from 'react';
import './ChannelsList.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const ChannelsList = ({server}) => {
  const channels = server.channels
  const serverId = useParams();
  console.log(serverId)

  return (
    <>
    <div className='channel-categories'>
      {channels.map(channel =>
        <NavLink to={`/channels/${serverId.serverId}/${channel.id}`} className='channels' key={channel.id}>{channel.name}</NavLink>)}
    </div>
    </>
  )
}

export default ChannelsList;