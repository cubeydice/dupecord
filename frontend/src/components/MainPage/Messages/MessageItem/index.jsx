import DefaultAvatar from '../assets/Person.png'
import './MessageItem.css'

const MessageItem = ({message, users}) => {
    const userAvatar = users[message.userId].avatarUrl ? users[message.userId].avatarUrl : DefaultAvatar;
    const userName = users[message.userId].username;
    const timeCreated = new Date(message.createdAt).toLocaleString();

    return (
        <div className='message-container' key={message.id}>
            <div className='message-avatar' key={message.id + "avatar"}>
                <img src={userAvatar} alt='user-avatar' className='message-avatar'/>
            </div>
                <div className='message-author' key={message.id + "author"}>
                {userName}&ensp;
                <sub>{timeCreated}</sub>
                </div>
                <div className='message-content' key={message.id + "content"}>
                    {message.content}
            </div>
        <br/>
        </div>
    )
}

export default MessageItem;