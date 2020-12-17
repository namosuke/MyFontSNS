import './main.scss'
import homeIcon from './img/home.svg'
import bellIcon from './img/bell.svg'
import messageIcon from './img/message.svg'
import profileIcon from './img/profile.svg'
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import axios from 'axios';

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
      <Route path="/notifications">通知</Route>
      <Route path="/messages">メッセージ</Route>
      <Route path="/profile">プロフィール</Route>
      <Route path="/">Tegak</Route>
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
  return <>通知</>;
}

function Messages() {
  return <>メッセージ</>;
}

function Profile() {
  return <>プロフィール</>;
}

function Timeline() {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('./timeline.json');
      setData(response.data);
    }
    getData();
  }, []);
  if (!data) return <>Loading...</>;
  return (<>
    {data.posts.map(item => (
      <li key={item.id}>{item.text}</li>
    ))}
  </>);
}