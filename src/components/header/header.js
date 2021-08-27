import React from 'react';
import LogoutButton from '../logoutButton';
import './header.scss';

const Header = () => {
  return (
    <div id="header">
      <div className="flex">
        <div>
          <h1>My-Q</h1>
          <p>Organize your life one task at a time</p>
        </div>
        <LogoutButton />
      </div>
    </div>
  )
}

export default Header;
