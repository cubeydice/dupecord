import React, { useEffect } from 'react';
import './ChannelsList.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as Settings } from './assets/settings.svg'
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/modals';
const ChannelText = require('./assets/ChannelText.png');

const ChannelsList = ({server}) => {
  const dispatch = useDispatch();
  const channels = server.channels
  const { serverId } = useParams();

  let categories = [...new Set(channels.map(channel => channel.category))]
  const noCategoryIndex = categories.indexOf(null)
  const noCategoryChannels = categories.slice(noCategoryIndex)
  categories =  noCategoryChannels.concat(categories.slice(0, noCategoryIndex)
    .concat(categories.slice(noCategoryIndex + 1, -1)))

  useEffect(()=>{}, [categories])

  const handleClick = (e) => {
    dispatch(openModal('update-channel-form'))
  }

  return (
    <>
    <div className='channel-categories'>
      {categories.map(category => {return <>
        {category}
        <br/>
        <div>
          {channels.map(channel => {
            if(channel.category === category) {
              return (
                <NavLink to={`/channels/${serverId}/${channel.id}`}
                key={channel.id}
                className='channels'>
                  <div>
                  <img src={ChannelText} alt='text' className='channel-icon'/>
                  {channel.name}
                  </div>
                  <Settings onClick={handleClick}/>
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