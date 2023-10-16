import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createServer } from '../../store/servers';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

const ServerForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [name, setName] = useState(`${sessionUser.username}'s server`);

  //event handler
  const handleChange = e => {
    setName(e.currentTarget.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const server = {
      name,
      owner_id: sessionUser.id
    }
    dispatch(createServer(server));
    <Redirect to='channels/@me'/>
  };

  return (
    <div className="server-form">
      <h1>Create a server</h1>
      <p>Your server is where you and your friends hang out. Make yours and start talking.</p> <br/>

      <form onSubmit={handleSubmit}>
        <label>SERVER NAME <br />
          <input
            type='text'
            value={name}
            onChange={handleChange} />
        </label>

        <br />
        By creating a server, you agree to Dupecord's Community Guidelines.
        <br />
        <input type="submit" value="Create" />
      </form>
    </div>
  )
}

export default ServerForm;