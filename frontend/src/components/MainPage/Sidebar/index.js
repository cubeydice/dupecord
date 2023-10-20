import './Sidebar.css'
import ProfileBar from "./ProfileBar";
import ServerButton from "./ServerButton";
import ChannelsList from "./ChannelsList";

const Sidebar = ({sessionUser, serverId, server}) => {
  return (
    <>
      <div className="sidebar">
        {(serverId !== "@me" && serverId !== null) ?
          <ServerButton server={server}/> : ""}

        <div className="sidebar-nav">
          {server ? <ChannelsList server={server}/> : "" }
        </div>

        <ProfileBar sessionUser={sessionUser}/>
      </div>
    </>
  )
}

export default Sidebar;