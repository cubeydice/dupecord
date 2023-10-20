import MemberItem from "./MemberItem";
import './MembersList.css'

const MemberList = ({users}) => {
    users = Object.values(users)
    return (<div className="member-list-container">
     {users.map(user => <MemberItem user ={user} key={user.id}/>)}
    </div>)
}

export default MemberList;