import './HeaderBar.css'
import { ReactComponent as ChannelTypeText } from '../assets/Type=Text.svg';

const HeaderBar = ({channel, serverId}) => {
  const header = () => {if (serverId === "@me") {
    return (
      'Friends'
    )
    } else {
      return(
        <>
        <ChannelTypeText className='channel-icon'/>&ensp;
        {channel.name}&ensp;
        <sub>{channel.topic}</sub>
        </>
      )
    }
  }

  return (
  <>
    <div className='header-bar'>
      <h1>{header()}</h1>
    </div>
  </>
  )
}

export default HeaderBar;