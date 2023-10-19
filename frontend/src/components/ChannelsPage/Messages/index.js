import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import HeaderBar from "./HeaderBar";
import './Messages.css'
import { fetchMessages, getMessages } from "../../../store/messages";
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput";
import { useEffect } from "react";

const Messages = ({channels, users}) => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const channel = channels[channelId] || {}
  let messages = Object.values(useSelector(getMessages))

  useEffect(() => {
    dispatch(fetchMessages())
  }, [dispatch])


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

        {messages.map(message => {
          if (message.messageableId === Number(channelId)) {
            return (<>
            <MessageItem message={message} users={users} key={message.id}/>
            </>)
          } else return null
        })}

        <MessageInput channel={channel} />
      </div>
    </>
  )
}

export default Messages;