import React from "react";
import { useDispatch } from "react-redux";
import './ServerOptions.css'

const ServerOptions = () => {
  const dispatch = useDispatch();

  return (
    <div className="server-options">
      <li>Server Settings</li>
      <li>Create Channel</li>
      <li>Create Category</li>
      <li>Leave Server</li>
      <li>Delete Server</li>
    </div>
  )
}

export default ServerOptions;