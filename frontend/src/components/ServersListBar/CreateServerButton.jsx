import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Plus } from './assets/Plus.svg';
import { openModal } from '../../store/modals'

const CreateServerButton = () => {
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

export default CreateServerButton;