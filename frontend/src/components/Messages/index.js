import HeaderBar from "./HeaderBar";
import './Messages.css'
import { useParams } from "react-router-dom/cjs/react-router-dom";

const Messages = ({channels}) => {
  const { serverId, channelId } = useParams();
  const channel = channels[channelId] || {}
  const introMessage = () => {
    if (channel.topic) {
      return channel.topic;
    } else {
      return `This is the start of the #${channel.name} channel.`;
    };
  };

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} channel={channel}/>
        <h1>Welcome to #{channel.name}!</h1>
        <p>{introMessage()}</p>
      </div>
    </>
  )
}

export default Messages;