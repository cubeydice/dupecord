import ServersSidebar from "../ServersSidebar";
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const ChannelsPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { serverId } = useParams();
  useEffect(() => dispatch(fetchServer(serverId)), [serverId])

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