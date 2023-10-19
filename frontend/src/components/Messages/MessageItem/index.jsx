
import './MessageItem.css'

const MessageItem = ({message, users}) => {
    const userAvatar = users[message.userId].avatarUrl
    const userName = users[message.userId].username
    const timeCreated = new Date(message.createdAt).toLocaleString();

    return (
        <div className='message-container'>
            <div className='message-avatar'>
                <img src={userAvatar} alt='user-avatar' className='server-icon'/>
            </div>
            <div className='message'>
                <div className='message-author'>
                {userName}
                {timeCreated}
                </div>
                {message.content}
            </div>
        <br/>
        </div>
    )
}

export default MessageItem;