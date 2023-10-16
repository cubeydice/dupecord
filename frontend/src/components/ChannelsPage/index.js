import ServersListBar from "../ServersListBar";
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import Modal from "../Modal/Modal";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { fetchServer, getServers } from "../../store/servers";

const ChannelsPage = () => {
  const sessionUser = useSelector(state => state.session.user);
  const servers = useSelector(getServers)
  const dispatch = useDispatch();
  const { serverId } = useParams();

  useEffect(() => {
    if (serverId !== '@me' && serverId !== null) dispatch(fetchServer(serverId));
  }, [dispatch, serverId, servers])


  if (!sessionUser) return <Redirect to="/" />;

return (
  <>
    <div className="channels-page">
      <ServersListBar sessionUser={sessionUser}/>
      <Sidebar sessionUser={sessionUser} serverId={serverId}/>
      <Messages/>
      <Modal/>
    </div>
    </>
  )
}

export default ChannelsPage;