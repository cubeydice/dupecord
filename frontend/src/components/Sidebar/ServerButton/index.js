import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import './ServerButton.css';
import { useSelector } from "react-redux";
import { getServer } from "../../../store/servers";

const ServerButton = ({serverId}) => {
  const server = useSelector(getServer(serverId))

  return (
    <>
    <button className="server-button">{server.name}</button>
    </>
  )
}

export default ServerButton;