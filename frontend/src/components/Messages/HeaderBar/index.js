import { useParams } from 'react-router-dom/cjs/react-router-dom';
import './HeaderBar.css'
import { useDispatch } from 'react-redux';
import { fetchServer } from '../../../store/servers';
import { useEffect } from 'react';

const HeaderBar = () => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  let channel = { name: "user-page" };
  // if (serverId !== "@me" && server.channels !== undefined) {channel = server.channels[channelId]}

  useEffect(()=>{
    if (serverId !== '@me' && serverId !== null) dispatch(fetchServer(serverId));
  }, [])

  return (
  <>
    <div className='header-bar'></div>Channel Name {channel.name}
  </>
  )
}

export default HeaderBar;