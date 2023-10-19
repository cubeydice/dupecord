import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getMessages } from "../../../store/messages";
import HeaderBar from "./HeaderBar";
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput";
import './Messages.css'
import consumer from '../../../consumer'
import { useEffect } from "react";

const Messages = ({channels, users}) => {
  const { serverId, channelId } = useParams();
  const channel = channels[channelId] || {}
  let messages = Object.values(useSelector(getMessages))

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: 'ChannelsChannel', id: channelId },
      {
        received: message => {
          console.log('Received message: ', message)
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [channelId])

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