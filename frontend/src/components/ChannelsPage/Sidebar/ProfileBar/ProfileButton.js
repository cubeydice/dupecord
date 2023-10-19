import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../../../store/session';
import { handleImgError } from "../../../../App";
import './ProfileButton.css'

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu(true);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    if (!showMenu) return;
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.signOut());
  };

  const userBio = () => {
    if (user.bio) { return(
      <>
        <li><h2>ABOUT ME</h2></li>
        <li>{user.bio}</li>
      </>)
      }
  }

  const date = new Date(user.created_at);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const userMemberDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;


  return (
    <>
      <button onClick={openMenu} className="profile-button">
        <img src={user.avatarUrl}
        onError={handleImgError}
        alt='profile-pic'
        className="profile-avatar"/>
        {user.username}</button>
      {showMenu && (
          <ul className="profile-dropdown">
            <li><h1>{user.username}</h1></li>

            <hr/>

            {userBio()}
            <li><h2>DUPECORD MEMBER SINCE</h2></li>
            <li>{(userMemberDate)}</li>

            <hr/>

            <li onClick={logout}>
              <img src={require ('./assets/Logout.png')} alt='logout' className="small-icon"/>Log Out
            </li>
          </ul>
      )}
    </>
  );
}

export default ProfileButton;