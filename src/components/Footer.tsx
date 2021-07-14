import React from 'react';
import { Route, Link } from 'react-router-dom';

import homeIcon from '../assets/home.svg';
import homeIcon2 from '../assets/home2.svg';
import bellIcon from '../assets/bell.svg';
import bellIcon2 from '../assets/bell2.svg';
import profileIcon from '../assets/profile.svg';
import profileIcon2 from '../assets/profile2.svg';
import messageIcon from '../assets/message.svg';
import messageIcon2 from '../assets/message2.svg';

const Footer = () => (
  <div className="footer">
    <Route exact path="/">
      <Link to="/"><img src={homeIcon} alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon} alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon} width="43" height="46" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon} alt="プロフィール" /></Link>
    </Route>
    <Route exact path="/notifications">
      <Link to="/"><img src={homeIcon2} alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon2} alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon} width="43" height="46" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon} alt="プロフィール" /></Link>
    </Route>
    <Route exact path="/messages">
      <Link to="/"><img src={homeIcon2} alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon} alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon2} width="43" height="46" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon} alt="プロフィール" /></Link>
    </Route>
    <Route exact path="/profile">
      <Link to="/"><img src={homeIcon2} alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon} alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon} width="43" height="46" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon2} alt="プロフィール" /></Link>
    </Route>
    <Route path="/font/set">
      <Link to="/"><img src={homeIcon2} alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon} alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon} width="43" height="46" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon} alt="プロフィール" /></Link>
    </Route>
    <Route path="/post">
      <Link to="/"><img src={homeIcon2} alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon} alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon} width="43" height="46" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon} alt="プロフィール" /></Link>
    </Route>

  </div>
);
export default Footer;
