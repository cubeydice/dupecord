import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom';
import { deleteChannel, getChannel, updateChannel } from '../../../store/channels';
import { closeModal } from '../../../store/modals';
import './ChannelsForm.css'
import { getServer } from '../../../store/servers';

const ChannelUpdateForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { serverId, channelId } = useParams();
  let channel = useSelector(getChannel(channelId));
  const server = useSelector(getServer(serverId))
  const firstChannelId = server.channels[0].id

  const [name, setName] = useState(channel.name);
  const [category, setCategory] = useState(channel.category);
  const [topic, setTopic] = useState(channel.topic);
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
      case 'category':
        setCategory(e.currentTarget.value)
        break;
      default:
        break;
    };
  }

  //DELETE CHANNEL
  const handleClick = (e) => {
    e.preventDefault();

    dispatch(deleteChannel(channelId));
    history.push(`/channels/${serverId}/${firstChannelId}`)
    dispatch(closeModal());
  }

  //UPDATE CHANNEL
  const handleSubmit = (e) => {
    e.preventDefault();

    channel = {
      ...channel,
      server_id: serverId,
      name,
      topic,
      category
    }

    dispatch(updateChannel(channel));
    dispatch(closeModal());
  };

  return (
    <div className="server-form">
      <div className='server-form-intro'>
      <h1>Update channel</h1> <br/>
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
        <label><h2>CHANNEL TOPIC</h2>
          <input
            type='text'
            value={topic}
            placeholder={topic ? topic : "Let everyone know how to use this channel!"}
            onChange={handleChange('topic')}
            className='form-input'/>
        </label>
        <label><h2>CATEGORY</h2>
          <input
            type='text'
            value={category}
            onChange={handleChange('category')}
            className='form-input'/>
        </label>
        <br/>
        <br />
        <button onClick={handleClick} id='channel-delete' className='form-submit'>Delete</button>
        <input type="submit"
          value="Save Changes"
          className='form-submit'
          id='channel-submit'
          disabled={isSubmitDisabled}
          />
      </form>
    </div>
  )
}

export default ChannelUpdateForm;