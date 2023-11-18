import { useParams } from "react-router-dom/cjs/react-router-dom";
import MemberItem from "./MemberItem";
import './MembersList.css'

const MemberList = ({users}) => {
    users = Object.values(users)
    const { serverId } = useParams();
    const isServer = (serverId === "@me") ? false : true

    return (<div className="member-list-container">
     {isServer ? users.map(user => <MemberItem user ={user} key={user.id}/>) : ""}
    </div>)
}

export default MemberList;