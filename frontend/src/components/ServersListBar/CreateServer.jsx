import React from "react";
import { useDispatch } from "react-redux";
import * as serverActions from  "../../store/servers"
import { ReactComponent as Plus } from './assets/Plus.svg';

const CreateServer = () => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch()
    }

    return (
    <div className="server-icon" id="server-create-button">
        <p>
        <Plus />
        </p>
    </div>
    )
}

export default CreateServer;