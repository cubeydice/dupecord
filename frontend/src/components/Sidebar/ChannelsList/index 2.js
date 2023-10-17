import React from 'react';
import './ChannelsList.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
const ChannelText = require('./assets/ChannelText.png');

const ChannelsList = ({server}) => {
  const channels = server.channels
  const serverId = useParams();

  const categories = [...new Set(channels.map(channel => channel.category))]

  return (
    <>
    <div className='channel-categories'>
      {categories.map(category => {return <>
        {category}
        <br/>
        <div>
          {channels.map(channel => {
            if(channel.category === category) {
              return (<div className='channels'>
                <NavLink to={`/channels/${serverId.serverId}/${channel.id}`}
                key={channel.id} className='channel-link'>
                  <img src={ChannelText} alt='text' className='channel-icon'/>
                  {channel.name}
                </NavLink>
                <br/>
              </div>)
            }
          })
          }
        </div>
        <br/>
      </>
      })}
    </div>
    </>
  )
}

export default ChannelsList;