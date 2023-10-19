import HeaderBar from "./HeaderBar";
import './Messages.css'
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Messages = ({channels}) => {
  const { serverId, channelId } = useParams();
  const channel = channels[channelId] || {}

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} channel={channel}/>
        <h1>Welcome to #{channel.name}!</h1>
        <p>This is the start of the #{channel.name} channel.</p>
      </div>
    </>
  )
}

export default Messages;