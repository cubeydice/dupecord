
import React from 'react';
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import './ProfileButton';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import './ProfileBar.css'


const ProfileBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  if (!sessionUser) return <Redirect to="/" />;

  return (
    <>
    <div className='profile-bar'>
      <ul className='profile-nav'>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        <li><img src={require ('./assets/userSettings.png') } alt='settings' className='profile-icon'/></li>
      </ul>
    </div>
    </>
  )
}

export default ProfileBar;