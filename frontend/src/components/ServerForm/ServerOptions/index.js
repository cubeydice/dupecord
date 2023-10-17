import React from "react";
import './ServerOptions.css'
import { ReactComponent as LeaveServer } from "./assets/guildLeaveServer.svg";
import { ReactComponent as CreateCategory } from "./assets/guildCreateCategory.svg";
import { ReactComponent as CreateChannel } from "./assets/guildCreateChannel.svg";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { deleteServer, fetchServers } from "../../../store/servers";
import { closeModal } from "../../../store/modals";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ServerOptions = () => {
  const history = useHistory();
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const Settings = require('./assets/userSettings.png')

  // useEffect(() => dispatch(fetchServers), [dispatch, serverId])

  const handleClick = (field) => (e) => {
    e.preventDefault();

    switch (field) {
      case 'delete':
        dispatch(deleteServer(serverId));
        dispatch(closeModal());
        history.push('/channels/@me');
        break;

      default:
        break;
    }
  }

  return (
    <div className="server-options">
      <li>Server Settings <img src={Settings} className='small-icon' alt='settings'/></li>
      <li>Create Channel<CreateChannel className='small-icon'/></li>
      <li>Create Category<CreateCategory className='small-icon'/></li>
      <hr/>
      <li className="warning">Leave Server<LeaveServer className='small-icon'/></li>
      <hr/>
      <li className="warning" onClick={handleClick('delete')}>Delete Server</li>
    </div>
  )
}

export default ServerOptions;