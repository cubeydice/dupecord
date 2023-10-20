import { createRef, useEffect } from "react";
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
  const messagesEndRef = createRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    const subscription = consumer.subscriptions.create(
      { channel: 'ChannelsChannel', id: channelId },
      {
        received: message => {
          console.log('Received message: ', message)
        }
      }
    );

    return () => subscription?.unsubscribe();
  }, [messages, channelId])

  const introMessage = () => {
      if (!isDirectMessage) {
        return (<>
          <h1>Welcome to #{channel.name}!</h1>
          <p>
            {`This is the start of the #${channel.name} channel. `
            + (channel.topic ? channel.topic : "")};
          </p>
        </>)
    }
  };

  return (
    <>
      <div className="messages">
        <HeaderBar serverId = {serverId} channel={channel}/>
        <br/>
        <div className="message-intro">
          {introMessage()}
        </div> <br/>
        <hr/>

        {messages.map(message => {
          if (message.messageableId === Number(channelId)) {
            return (<>
            <MessageItem message={message} users={users} key={message.id}/>
            </>)
          } else return null
        })}
        <div ref={messagesEndRef}></div>

        {!isDirectMessage ? <MessageInput channel={channel} /> : null}
      </div>
    </>
  )
}

export default Messages;