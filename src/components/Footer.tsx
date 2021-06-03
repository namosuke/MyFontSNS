import React from 'react';
import { Link } from 'react-router-dom';

import homeIcon from '../assets/home.svg';
import bellIcon from '../assets/bell.svg';
import profileIcon from '../assets/profile.svg';
import messageIcon from '../assets/message.svg';

const Footer = () => (
  <div className="footer">
    <Link to="/"><img src={homeIcon} alt="タイムライン" /></Link>
    <Link to="/notifications"><img src={bellIcon} alt="通知" /></Link>
    <Link to="/messages"><img src={messageIcon} width="43" height="46" alt="メッセージ" /></Link>
    <Link to="/profile"><img src={profileIcon} alt="プロフィール" /></Link>
  </div>
);
export default Footer;
