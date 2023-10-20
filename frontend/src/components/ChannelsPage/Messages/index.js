import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getMessages } from "../../../store/messages";
import HeaderBar from "./HeaderBar";
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput";
import './Messages.css'
import consumer from '../../../consumer'

const Messages = ({channels, users}) => {
  const { serverId, channelId } = useParams();
  const channel = channels[channelId] || {}
  const isDirectMessage = (Object.keys(channel).length === 0)
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
      return `This is the start of the #${channel.name} channel. `
      + (channel.topic ? channel.topic : "");
  };

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} channel={channel}/>
        <br/>
        <div className="message-intro">
          <h1>Welcome to #{channel.name}!</h1>
          <p>{introMessage()}</p>
        </div> <br/>
        <hr/>

        {messages.map(message => {
          if (message.messageableId === Number(channelId)) {
            return (<>
            <MessageItem message={message} users={users} key={message.id}/>
            </>)
          } else return null
        })}

        {!isDirectMessage ? <MessageInput channel={channel} /> : null}
      </div>
    </>
  )
}

export default Messages;