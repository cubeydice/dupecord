
import React from 'react';
import ProfileButton from './ProfileButton';
import './ProfileButton';
import './ProfileBar.css'

const ProfileBar = ({sessionUser}) => {

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