import React from 'react';
import './header.scss';
import quimbly from '../../assets/quimbly.png';
import Calendars from '../calendars';

const Header = () => {
  return (
    <div id="header">
      <div>
        <div id="cal-icon"> 📆 </div>
        <Calendars />
        <div id="logo-container">
          <img id="logo" src={quimbly} alt="quimbly logo" />
        </div>
        {/* <LogoutButton /> */}
      </div>
    </div>
  )
}

export default Header;
