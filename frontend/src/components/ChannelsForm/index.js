import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { createServer } from '../../../store/servers';
import { closeModal } from '../../../store/modals';
import './ServerCreateForm.css'

const ChannelsForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [ serverId, channelId ] = useParams();

  const [name, setName] = useState(``);
  const [topic, setTopic] = useState(``);
  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    if (name === "") setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [name])

  //event handlers
  const handleChange = (field) => (e) => {
    e.preventDefault();

    switch (field) {
      case 'name':
        setName(e.currentTarget.value)
        break;
      case 'topic':
        setTopic(e.currentTarget.value)
        break;
      default:
        break;
    };
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const channel = {
      server_id: serverId,
      name,
      topic
    }

    dispatch(createServer(name)).then(res => history.push(`/channels/${res.server.id}`));
    dispatch(closeModal());
  };

  return (
    <div className="server-form">
      <div className='server-form-intro'>
      <h1>Create channel</h1> <br/>
      </div>

      <form onSubmit={handleSubmit} className="server-form-input">

        <label><h2>CHANNEL NAME</h2>
          <input
            type='text'
            value={name}
            onChange={handleChange('name')}
            className='form-input'/>
        </label>
        <br/>
        <br />
        <input type="submit"
          value="Create Channel"
          className='form-submit'
          disabled={isSubmitDisabled}
          />
      </form>
    </div>
  )
}

export default ChannelsForm;


