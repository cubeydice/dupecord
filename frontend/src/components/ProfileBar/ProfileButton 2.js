import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
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
    document.addEventListener('click', showMenu ? closeMenu : openMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.signOut());
  };

  return (
    <>
      <p onClick={openMenu}>{user.username}</p>
      {showMenu && (
        <ul className="profile-dropdown">
          <li><h1>{user.username}</h1></li>
          <li><h2>ABOUT ME</h2></li>
          <li>{user.bio}</li>
          <li><h2>DUPECORD MEMBER SINCE</h2></li>
          <li>{(user.created_at)}</li>
          <li onClick={logout}>
          <img src={require ('./assets/Logout.png')} alt='logout' className="profile-icon"/>Log Out
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;