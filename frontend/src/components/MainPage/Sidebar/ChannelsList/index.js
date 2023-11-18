import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom';
import { openModal } from '../../../../store/modals';
import { ReactComponent as Settings } from './assets/settings.svg'
import { ReactComponent as ChannelTypeText } from './assets/Type=Text.svg';
import './ChannelsList.css'

const ChannelsList = ({server}) => {
  const dispatch = useDispatch();
  const channels = server.channels
  const { serverId } = useParams();

  let categories = [...new Set(channels.map(channel => channel.category))]
  if (categories.includes(null)) {
    const noCategoryIndex = categories.indexOf(null)
    const noCategoryChannels = categories.slice(noCategoryIndex)
    categories =  noCategoryChannels.concat(categories.slice(0, noCategoryIndex))
                  .concat(categories.slice(noCategoryIndex + 1, -1))
  }

  const handleClick = (e) => {
    dispatch(openModal('update-channel-form'))
  }

  return (
    <>
    <div className='channel-categories'>
      {categories.map(category => {return <>
        {<div className='channel-category' key={category}>
          {category}
        </div>}

        <br/>

        <div key={server.id + category}>
          {channels.map(channel => {
            if(channel.category === category) {
              return (
                <NavLink to={`/channels/${serverId}/${channel.id}`}
                key={channel.id}
                className='channels'>
                  <div className='channel-name' key={channel.name}>
                    <ChannelTypeText
                    id='channel-icon'
                    key={channel.id + "icon"}/>
                    <p>{channel.name}</p>
                  </div>

                  <Settings onClick={handleClick}
                  id="channel-setting-icon"
                  key={channel.id + "setting-icon"}/>
                </NavLink>
              )
            } else return "";
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