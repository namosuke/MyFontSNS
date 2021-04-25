import { Link } from 'react-router-dom';
import React from 'react';

import homeIcon from '../assets/home.svg';
import bellIcon from '../assets/bell.svg';
import messageIcon from '../assets/message.svg';
import profileIcon from '../assets/profile.svg';

const Footer = () => (
  <div className="footer">
    <Link to="/"><img src={homeIcon} width="30" alt="タイムライン" /></Link>
    <Link to="/notifications"><img src={bellIcon} width="30" alt="通知" /></Link>
    <Link to="/messages"><img src={messageIcon} width="30" alt="メッセージ" /></Link>
    <Link to="/profile"><img src={profileIcon} width="30" alt="プロフィール" /></Link>
  </div>
);
export default Footer;
