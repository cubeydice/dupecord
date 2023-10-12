import ProfileBar from "../ProfileBar";
import UserServersSidebar from "../UserServersSidebar";
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from "react-redux";

const ChannelsPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className="channels-page">
      <UserServersSidebar sessionUser={sessionUser}/>
      <Sidebar/>
      <ProfileBar sessionUser={sessionUser}/>
      <Messages/>
    </div>
    </>
  )
}

export default ChannelsPage;