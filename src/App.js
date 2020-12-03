import React from "react";
import './main.scss'
import homeIcon from './img/home.svg'
import bellIcon from './img/bell.svg'
import messageIcon from './img/message.svg'
import profileIcon from './img/profile.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Header />
      <Contents />
      <Footer />
    </Router>
  );
}

function Header() {
  return <div className="header">
    <Switch>
      <Route path="/notifications">
        <Notifications />
      </Route>
      <Route path="/messages">
        <Messages />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/">
        <span>Tegak</span>
      </Route>
    </Switch>
  </div>;
}

function Footer() {
  return (
    <div className="footer">
      <Link to="/"><img src={homeIcon} width="30" /></Link>
      <Link to="/notifications"><img src={bellIcon} width="30" /></Link>
      <Link to="/messages"><img src={messageIcon} width="30" /></Link>
      <Link to="/profile"><img src={profileIcon} width="30" /></Link>
    </div>
  );
}

function Contents() {
  return (
    <div className="contents">
      <Switch>
        <Route path="/notifications">
          <Notifications />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Timeline />
        </Route>
      </Switch>
    </div>
  );
}

function Notifications() {
  return (
    <div>
      通知
    </div>
  );
}

function Messages() {
  return (
    <div>
      ダイレクトメッセージ
    </div>
  );
}
function Profile() {
  return (
    <div>
      プロフィール
    </div>
  );
}
function Timeline() {
  return (
    <div>
      タイムライン
    </div>
  );
}