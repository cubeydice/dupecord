import ServersSidebar from "../ServersSidebar";
import Sidebar from "../Sidebar";
import Messages from "../ChannelBody";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from "react-redux";

const ChannelsPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className="channels-page">
      <ServersSidebar sessionUser={sessionUser}/>
      <Sidebar sessionUser={sessionUser}/>
      <Messages/>
    </div>
    </>
  )
}

export default ChannelsPage;