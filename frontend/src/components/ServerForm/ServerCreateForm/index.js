import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServer } from '../../../store/servers';
import { closeModal } from '../../../store/modals';
import './ServerCreateForm.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const ServerCreateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState(`${sessionUser.username}'s server`);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (name === "") setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [name])

  //event handler
  const handleChange = e => {
    setName(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const server = {
      name,
      owner_id: sessionUser.id,
    }

    dispatch(createServer(server)).then(res => history.push(`/channels/${res.server.id}`));
    dispatch(closeModal());
  };

  return (
    <div className="server-form">
      <div className='server-form-intro'>
      <h1>Create a server</h1> <br/>
      <p>Your server is where you and your friends hang out. Make yours and start talking.</p> <br/>
      </div>

      <form onSubmit={handleSubmit} className="server-form-input">
        <label><h2>SERVER NAME</h2>
          <input
            type='text'
            value={name}
            onChange={handleChange}
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