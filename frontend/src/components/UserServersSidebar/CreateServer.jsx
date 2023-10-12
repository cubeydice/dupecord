import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as serverActions from  "../../store/servers"

const CreateServer = () => {
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch()
    }
    
    return (
    <>
        <img src={require ('./assets/server_create.png') } alt='server-create'/>
    </>
    )
}

export default CreateServer;