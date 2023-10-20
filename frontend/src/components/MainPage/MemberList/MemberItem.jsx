import './MembersList.css'

const MemberItem = ({user}) => {
    const userAvatar = user.avatarUrl;
    const userName = user.username;

    return (<>
    <div className='member-list'>
        <div className='member-container'>
            <div className='member-avatar'>
                <img src={userAvatar} alt='user-avatar' className='profile-avatar'/>
            </div>
            <div className='message-name'>
                {userName}
            </div>
        </div>
    </div>
    </>)
}

export default MemberItem;