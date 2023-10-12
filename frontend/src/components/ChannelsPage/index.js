import ProfileBar from "../ProfileBar";
import ServerSidebar from "../ServerSidebar";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from "react-redux";

const ChannelsPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
     <ServerSidebar/>
     <ProfileBar sessionUser={sessionUser}/>
    </>
  )
}

export default ChannelsPage;