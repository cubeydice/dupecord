import React from "react";
import './ServerButton.css';
import { useSelector } from "react-redux";
import { getServer } from "../../../store/servers";

const ServerButton = ({ serverId }) => {
  const server = useSelector(getServer(serverId.serverId))

  return (
    <>
    {server ? <button className="server-button">{server.name}</button>  : ""}
    </>
  )
}

export default ServerButton;