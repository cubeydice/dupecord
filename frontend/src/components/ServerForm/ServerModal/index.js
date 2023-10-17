import React from "react";
import { useDispatch } from "react-redux";

const ServerModal = () => {
  const dispatch = useDispatch();

  return (
    <div className="server-modal">
      <li>Server Settings</li>
      <li>Create Channel</li>
      <li>Create Category</li>
      <li>Leave Server</li>
      <li>Delete Server</li>
    </div>
  )
}

export default ServerModal;