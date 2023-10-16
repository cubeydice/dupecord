import React from "react";
import { useDispatch } from "react-redux";
import { ReactComponent as Plus } from './assets/Plus.svg';
import { Link } from "react-router-dom/cjs/react-router-dom";

const CreateServer = () => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch()
    }

    return (
    <Link to='create-server' className="server-icon" id="server-create-button">
        <p>
        <Plus />
        </p>
    </Link>
    )
}

export default CreateServer;