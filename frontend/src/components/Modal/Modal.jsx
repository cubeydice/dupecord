import React from 'react';
import { closeModal } from '../../store/modals';
import { useSelector, useDispatch} from 'react-redux';
import ServerForm from '../ServerForm';
import './Modal.css'

const Modal = () => {
  const modal = useSelector(state => state.modal)
  const dispatch = useDispatch();

  if (!modal) {
    return null;
  }

  let component;

  switch (modal) {
    case 'server-form':
      component = <ServerForm />;
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
    <div className="modal-background" onClick={handleClick}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

export default Modal;