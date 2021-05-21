import React from 'react';
import { Route, Link } from 'react-router-dom';
import profileIcon from '../assets/profile.svg';
import serchIcon from '../assets/serch.svg';

const Header = () => (
  <div className="header sticky top-0 w-full text-center text-2xl pt-1 h-11">
    <Link to="/profile"><img src={profileIcon} width="30" alt="プロフィール" /></Link>
    <Route exact path="/">
      <Link to="/">Mojy</Link>
    </Route>
    <Route path="/notifications">
      <Link to="/notifications">通知</Link>
    </Route>
    <Route path="/messages">
      <Link to="/messages">メッセージ</Link>
    </Route>
    <Route path="/profile">
      <Link to="/profile">プロフィール</Link>
    </Route>
    <img src={serchIcon} width="30" alt="検索" />
  </div>
);
export default Header;
