import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div className="header sticky top-0 w-full text-center text-2xl pt-1 h-11">
      <NavLink exact to="/notifications">通知</NavLink>
      <NavLink exact to="/messages">メッセージ</NavLink>
      <NavLink exact to="/profile">プロフィール</NavLink>
      <NavLink exact to="/">Tegak</NavLink>
    </div>
  );
}
export default Header;
