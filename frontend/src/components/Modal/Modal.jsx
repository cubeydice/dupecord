import React from 'react';
import { closeModal } from '../../store/modals';
import { useSelector, useDispatch} from 'react-redux';
import ServerCreateForm from '../ServerForm/ServerCreateForm';
import ServerOptions from '../ServerForm/ServerOptions';
import ServerUpdateForm from '../ServerForm/ServerUpdateForm';
import ChannelsForm from '../ChannelsForm';
import ChannelUpdateForm from '../ChannelsForm/ChannelUpdateForm';
import './Modal.css'

const Modal = () => {
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch();

  if (!modal) {
    return null;
  }

  let component;

  switch (modal) {
    case 'create-server-form':
      component = <ServerCreateForm />;
      break;
    case 'server-options':
      component = <ServerOptions />;
      break;
    case 'update-server-form':
      component = <ServerUpdateForm />;
      break;
    case 'channel-form':
      component = <ChannelsForm />;
      break;
    case 'update-channel-form':
      component = <ChannelUpdateForm />;
      break;
    case 'other':
      break;
    default:
      return null;
  }

  const handleClick = (e) => {
    dispatch(closeModal());
  }

  return (
    <div
    className={ modal !== ('server-options') ?
    "full-modal-background" :
    "modal-background"}
    onClick={handleClick}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

export default Modal;