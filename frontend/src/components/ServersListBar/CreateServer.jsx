import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Plus } from './assets/Plus.svg';
import { Link } from "react-router-dom/cjs/react-router-dom";
import { openModal } from '../../store/modals'

const CreateServer = () => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(openModal('server-form'))
    }

    return (
    <div onClick={handleClick} className="server-icon" id="server-create-button">
        <p>
        <Plus />
        </p>
    </div>
    )
}

export default CreateServer;