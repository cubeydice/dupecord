import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { createServer } from '../../../store/servers';
import { closeModal } from '../../../store/modals';
import { handleImgError } from "../../../App";
import './ServerCreateForm.css'

const ServerCreateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const [name, setServerName] = useState(`${sessionUser.username}'s server`);
  const [serverIcon, setServerIcon] = useState('');
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (name === "") setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [name])

  //event handlers
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const server = {
      name,
      server_icon: serverIcon
    }

    dispatch(createServer(server)).then(res => history.push(`/channels/${res.server.id}`));
    dispatch(closeModal());
  };

  const iconPreview = serverIcon ?
    <img src={serverIcon}
            onError={ handleImgError }
            alt='server-icon'
            className="large-icon"
            /> :
    <p className="large-icon">{name[0]}</p>

  return (
    <div className="server-form">
      <div className='server-form-intro'>
      <h1>Create a server</h1> <br/>
      <p>Your server is where you and your friends hang out. Make yours and start talking.</p> <br/>
      </div>

      <form onSubmit={handleSubmit} className="server-form-input">
        <div className='update-icon'>
          {iconPreview}
          <label><h2>SERVER ICON</h2>
          <input type="text"
          value={serverIcon}
          className="form-input"
          onChange={handleChange('serverIcon')}
          />
          </label>
        </div>
        <br/>

        <label><h2>SERVER NAME</h2>
          <input
            type='text'
            value={name}
            onChange={handleChange('serverName')}
            className='form-input'/>
        </label>

        <br />
        <sub>
        By creating a server, you agree to Dupecord's Community Guidelines.
        </sub>
        <br/>
        <br />
        <input type="submit"
          value="Create"
          className='form-submit'
          disabled={isSubmitDisabled}
          />
      </form>
    </div>
  )
}

export default ServerCreateForm;