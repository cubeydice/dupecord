import './MessageItem.css'

const MessageItem = ({message, users}) => {
    const userAvatar = users[message.userId].avatarUrl
    const userName = users[message.userId].username
    const timeCreated = new Date(message.createdAt).toLocaleString();

    return (
        <div className='message-container'>
            <div className='message-avatar'>
                <img src={userAvatar} alt='user-avatar' className='message-avatar'/>
            </div>
                <div className='message-author'>
                {userName}&ensp;
                <sub>{timeCreated}</sub>
                </div>
                <div className='message-content'>
                    {message.content}
            </div>
        <br/>
        </div>
    )
}

export default MessageItem;