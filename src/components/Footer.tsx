import React from 'react';
import { Link } from 'react-router-dom';

import homeIcon from '../assets/home.svg';
import bellIcon from '../assets/bell.svg';
import profileIcon from '../assets/profile.svg';
import messageIcon from '../assets/message.svg';

const Footer = () => (
  <div className="footer">
    <Link to="/"><img src={homeIcon} width="46" height="36" alt="タイムライン" /></Link>
    <Link to="/notifications"><img src={bellIcon} width="36" height="43" alt="通知" /></Link>
    <Link to="/messages"><img src={messageIcon} width="43" height="31" alt="メッセージ" /></Link>
    <Link to="/profile"><img src={profileIcon} width="46" height="46" alt="プロフィール" /></Link>
  </div>
);
export default Footer;
