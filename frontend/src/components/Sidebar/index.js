import React from "react";
import './Sidebar.css'
import ProfileBar from "./ProfileBar";

const Sidebar = ({sessionUser}) => {

  return (
    <>
      <div className="sidebar">
      <ProfileBar sessionUser={sessionUser}/>
      </div>
    </>
  )
}

export default Sidebar;