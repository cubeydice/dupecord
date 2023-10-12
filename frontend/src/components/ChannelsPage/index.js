import ProfileBar from "../ProfileBar";
import UserServersSidebar from "../UserServersSidebar";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from "react-redux";

const ChannelsPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
     <UserServersSidebar/>
     <ProfileBar sessionUser={sessionUser}/>
    </>
  )
}

export default ChannelsPage;