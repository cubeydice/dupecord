import React from 'react';
import './ChannelsList.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

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
              return (<>
                <NavLink to={`/channels/${serverId.serverId}/${channel.id}`}
                className='channels'
                key={channel.id}>
                  {channel.name}
                </NavLink>
                <br/>
              </>)
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