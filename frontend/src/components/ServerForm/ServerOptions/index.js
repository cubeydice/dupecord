import React from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import { deleteServer, getServer, leaveServer } from "../../../store/servers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../store/modals";
import { ReactComponent as LeaveServer } from "./assets/guildLeaveServer.svg";
import { ReactComponent as CreateCategory } from "./assets/guildCreateCategory.svg";
import { ReactComponent as CreateChannel } from "./assets/guildCreateChannel.svg";
import { ReactComponent as Settings } from "./assets/settings.svg";
import './ServerOptions.css';

const ServerOptions = () => {
  const history = useHistory();
  const { serverId } = useParams();
  const server = useSelector(getServer(serverId))
  const sessionUser = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchServers())
  // }, [dispatch, serverId])

  const handleClick = (field) => (e) => {
    e.preventDefault();

    switch (field) {
      case 'delete':
        dispatch(deleteServer(serverId));
        dispatch(closeModal());
        history.push('/channels/@me');
        break;
        case 'leave':
          dispatch(leaveServer(serverId))
          dispatch(closeModal());
          history.push('/channels/@me');
        break;
      default:
        break;
    }
  }

  if (sessionUser.id === server.ownerId) { return (
    <div className="server-options">
      <li>Server Settings <Settings className='small-icon'/></li>
      <li>Create Channel<CreateChannel className='small-icon'/></li>
      <li>Create Category<CreateCategory className='small-icon'/></li>
      <hr/>
      <li className="warning" onClick={handleClick('delete')}>
        Delete Server
      </li>
    </div>
  )} else {
    return (
      <div className="server-options">
      <li className="warning" onClick={handleClick('leave')}>
        Leave Server<LeaveServer className='small-icon'/>
      </li>
    </div>
    )
  }
}

export default ServerOptions;