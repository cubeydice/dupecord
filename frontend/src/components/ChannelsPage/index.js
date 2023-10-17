import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { fetchServer } from "../../store/servers";
import ServersListBar from "../ServersListBar";
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import Modal from "../Modal/Modal";

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