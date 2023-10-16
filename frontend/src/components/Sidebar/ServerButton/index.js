import React from "react";
import './ServerButton.css';

const ServerButton = ({ server }) => {

  return (
    <>
    {server ? <button className="server-button">{server.name}</button>  : ""}
    </>
  )
}

export default ServerButton;