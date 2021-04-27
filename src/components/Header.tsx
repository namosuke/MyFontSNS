import React from 'react';
import { Route, Link } from 'react-router-dom';

const Header = () => (
  <div className="header sticky top-0 w-full text-center text-2xl pt-1 h-11">
    <Route exact path="/">
      <Link to="/">Tegaki</Link>
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
  </div>
);
export default Header;
