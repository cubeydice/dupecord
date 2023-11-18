import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom/cjs/react-router-dom';
import { openModal } from '../../../../store/modals';
import { ReactComponent as Settings } from './assets/settings.svg'
import { ReactComponent as ChannelTypeText } from './assets/Type=Text.svg';
import { ReactComponent as Button } from './assets/button.svg';

import './ChannelsList.css'

const ChannelsList = ({server}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
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
          <Button className="channel-category-button"/> <span>{category.toUpperCase()}</span>
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
                  {server.ownerId === sessionUser.id ? <Settings onClick={handleClick}
                  id="channel-setting-icon"
                  key={channel.id + "setting-icon"}/>:""}

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