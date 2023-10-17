import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { fetchServer, updateServer } from "../../../store/servers";
import { closeModal } from "../../../store/modals";
import './ServerUpdateForm.css'

const ServerUpdateForm = () => {
  const dispatch = useDispatch();
    const { serverId } = useParams();
    const server = useSelector(fetchServer(serverId))
    const [serverName, setServerName] = useState(server.name);
    const [serverIcon, setServerIcon] = useState(server.server_icon)

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateServer(serverId))
        dispatch(closeModal)
    }

    const handleChange = (field) => (e) => {
        e.preventDefault();

        switch (field) {
          case 'serverName':
            setServerName(e.currentTarget.value)
            break;
          case 'serverIcon':
            setServerIcon(e.currentTarget.value)
            break;
          default:
            break;
        };
      }

    return (
        <>
        <form onSubmit={handleSubmit} className="update-server">
            <h1>Server Overview</h1>
            <input type="text"
            value={serverIcon}
            onChange={handleChange('serverIcon')}
            />
            <label>SERVER NAME</label>
            <input type="text"
            value={serverName}
            onChange={handleChange('serverName')}/>
            <input type='submit'></input>
        </form>
        </>
    )
}

export default ServerUpdateForm;