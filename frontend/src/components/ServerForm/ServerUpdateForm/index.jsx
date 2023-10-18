import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { getServer, updateServer } from "../../../store/servers";
import { closeModal } from "../../../store/modals";
import { handleImgError } from "../../../App";
import './ServerUpdateForm.css'

const ServerUpdateForm = () => {
  const dispatch = useDispatch();

  const { serverId } = useParams();
  let server = useSelector(getServer(serverId))

  const [name, setServerName] = useState(server.name);
  const [serverIcon, setServerIcon] = useState(server.serverIcon);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (name === "") setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [name])

  //event handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    server = {
      name,
      server_icon: serverIcon
    }

    dispatch(updateServer(serverId))
    dispatch(closeModal())
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

  const iconPreview = serverIcon ?
  <img src={serverIcon}
          onError={ handleImgError }
          alt='server-icon'
          className="large-icon"
          /> :
  <p className="large-icon">{server.name[0]}</p>

  return (
      <>
      <form onSubmit={handleSubmit} className="update-server">
          <h1>Server Overview</h1>
          <div className='update-icon'>
          {iconPreview}
          <label>SERVER ICON <br/>
          <input type="text"
          value={serverIcon}
          className="form-input"
          onChange={handleChange('serverIcon')}
          />
          </label>
          </div>
          <label>SERVER NAME <br/>
          <input type="text"
          value={name}
          className="form-input"
          onChange={handleChange('serverName')}/>
          </label>
          <input
          type='submit'
          value='Save Changes'
          className="form-submit"
          id='update-server-submit'
          disabled={isSubmitDisabled}
          ></input>
      </form>
      </>
  )
}

export default ServerUpdateForm;