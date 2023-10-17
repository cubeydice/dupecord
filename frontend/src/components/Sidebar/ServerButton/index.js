import React from "react";
import './ServerButton.css';
import { openModal } from '../../../store/modals'
import { useDispatch } from "react-redux";
import { ReactComponent as Button} from './assets/button.svg'

const ServerButton = ({ server }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(openModal('server-options'))
  }

  return (
    <>
    {server ? <button className="server-button" onClick={handleClick}>{server.name}<Button/></button>  : ""}
    </>
  )
}

export default ServerButton;