
import React from 'react';
import ProfileButton from './ProfileButton';
import './ProfileButton';
import './ProfileBar.css'

const ProfileBar = ({sessionUser}) => {

  return (
    <>
      <ul className='profile-nav'>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        <li><img src={require ('./assets/userSettings.png') } alt='settings' className='small-icon'/></li>
      </ul>
    </>
  )
}

export default ProfileBar;