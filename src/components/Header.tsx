import React from "react";
import { Route, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton"
import profileIcon from "../assets/profile.svg";
import searchIcon from "../assets/search.svg";
import LogoutButton from "./LogoutButton";

const Header = () =>{
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <div className="header sticky top-0 w-full text-center text-2xl pt-1 h-11">
      <Link to="/profile">
        <img src={profileIcon} alt="プロフィール" />
      </Link>
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
        <Link to="/profile">Mojy</Link>
      </Route>
      <Route path="/font/set">
        <Link to="/font/set">フォントセット</Link>
      </Route>
      <Route path="/post">
        <Link to="/post">投稿</Link>
      </Route>
      <div>
        <img src={searchIcon} alt="検索" />
      </div>
      <div>
        { isAuthenticated ? (
          <LogoutButton/>
        ):(
          <LoginButton/>
        )}

      </div>
    </div>
  );
}
export default Header;
