import React from 'react';
import LogoutButton from '../logoutButton';
import './header.scss';
import quimbly from '../../assets/quimbly.png';

const Header = () => {
  return (
    <div id="header">
      <div className="flex">
        <div id="logo-container">
          <img id="logo" src={quimbly} alt="quimbly logo" />
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Header;
