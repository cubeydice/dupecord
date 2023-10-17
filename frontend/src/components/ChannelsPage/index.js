import ServersListBar from "../ServersListBar";
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import Modal from "../Modal/Modal";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, ImgHTMLAttributes } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { fetchServer } from "../../store/servers";

const ChannelsPage = () => {
  const dispatch = useDispatch();
  const { serverId } = useParams();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (serverId !== '@me' && serverId !== null) dispatch(fetchServer(serverId));
  }, [dispatch, serverId])


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