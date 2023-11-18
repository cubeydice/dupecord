import { createRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getMessages, receiveMessage } from "../../../store/messages";
import HeaderBar from "./HeaderBar";
import MessageItem from "./MessageItem"
import MessageInput from "./MessageInput";
import './Messages.css'
import consumer from '../../../consumer'
import { ReactComponent as PencilSvg } from "./assets/Pencil.svg";
import { getServer } from "../../../store/servers";
import { openModal } from "../../../store/modals";

const Messages = ({channels, users}) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const { serverId, channelId } = useParams();
  const server = useSelector(getServer(serverId));
  const channel = channels[channelId] || {}
  const isDirectMessage = (Object.keys(channel).length === 0)
  let messages = Object.values(useSelector(getMessages))
  const messagesEndRef = createRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom();
  })

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
    { channel: 'ChannelsChannel', id: channelId },
    {

        received: message => {
        dispatch(receiveMessage(message))
        }
    }
    );

    return () => subscription?.unsubscribe();
  }, [dispatch, channelId])

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(openModal('update-channel-form'))
  }

  const introMessage = () => {
      if (!isDirectMessage) {
        return (<>
          <h1>Welcome to #{channel.name}!</h1>
          <p>
            {`This is the start of the #${channel.name} channel. `
            + (channel.topic ? channel.topic : "")}
          </p>
        </>)
    }
  };

  return (
    <>
      <HeaderBar serverId = {serverId} channel={channel}/>
        <div className="messages-body">

          <div className="message-intro">
            {introMessage()}
            { (serverId !== "@me" && channelId && server) ? (sessionUser.id === server.ownerId ?
            <>
            <div className="message-channel-edit" onClick={handleClick}>
              <PencilSvg/>
              Edit Channel
            </div>
            <hr id="message-hr"/>
            </>
            : <hr id="message-hr"/> ) : ""}
          </div>

          {messages.map(message => {
            if (message.messageableId === Number(channelId)) {
              return (<>
              <MessageItem message={message} users={users} key={message.id}/>
              </>)
            } else return null
          })}
          <div ref={messagesEndRef}></div>

        </div>
        {!isDirectMessage ? <MessageInput channel={channel} /> : null}
    </>
  )
}

export default Messages;