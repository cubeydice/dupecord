import './Sidebar.css'
import ProfileBar from "./ProfileBar";
import ServerButton from "./ServerButton";
import ChannelsList from "./ChannelsList";
import SearchBar from './ConvoSearchBar/ConvoSearchBar';

const Sidebar = ({sessionUser, serverId, server}) => {
  return (
    <>
    {(serverId !== "@me" && serverId !== null) ?
      <ServerButton server={server}/> : <SearchBar/>}
      <div className="sidebar">

        <div className="sidebar-nav">
          {server ? <ChannelsList server={server} key={server.id}/> : "" }
        </div>

      </div>
      <ProfileBar sessionUser={sessionUser}/>
    </>
  )
}

export default Sidebar;