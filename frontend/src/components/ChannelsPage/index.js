import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { fetchServer, getServer } from "../../store/servers";
import { getChannels } from "../../store/channels";
import ServersListBar from "../ServersListBar";
import Sidebar from "../Sidebar";
import Messages from "../Messages";
import Modal from "../Modal/Modal";

const ChannelsPage = () => {
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const server = useSelector(getServer(serverId))
  const sessionUser = useSelector(state => state.session.user);
  const channels = useSelector(getChannels)

  useEffect(() => {
    if (serverId !== '@me' && serverId !== null) dispatch(fetchServer(serverId));
  }, [dispatch, serverId])


  if (!sessionUser) return <Redirect to="/" />;

return (
  <>
    <div className="channels-page">
      <ServersListBar sessionUser={sessionUser}/>
      <Sidebar sessionUser={sessionUser} serverId={serverId} server={server}/>
      <Messages channels={channels}/>
      <Modal/>
    </div>
    </>
  )
}

export default ChannelsPage;