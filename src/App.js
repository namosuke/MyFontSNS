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
  return <div className="header sticky top-0 w-full text-center text-2xl pt-1 h-11">
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
      <Link to="/"><img src={homeIcon} width="30" alt="タイムライン" /></Link>
      <Link to="/notifications"><img src={bellIcon} width="30" alt="通知" /></Link>
      <Link to="/messages"><img src={messageIcon} width="30" alt="メッセージ" /></Link>
      <Link to="/profile"><img src={profileIcon} width="30" alt="プロフィール" /></Link>
    </div>
  );
}

function Contents() {
  return (
    <div className="m-3">
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
  useEffect(() => {
    new TegakiCanvas();
  });
  return <canvas id="tegaki-canvas" className="bg-white"></canvas>;
}

class TegakiCanvas {
  constructor() {
    this.canvas = document.querySelector('#tegaki-canvas');
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.canvasPixelTimes = this.canvas.width / this.canvas.clientWidth;
    this.ctx = this.canvas.getContext('2d');
    this.cellX = 32;
    this.cellY = 32;
    this.cellArr = Array.from(new Array(this.cellY), () => new Array(this.cellX).fill(0));
    this.paperRect = [10.5, 10.5, 380, 380];
    this.ctx.fillStyle = 'black';
    //this.ctx.strokeRect(...this.paperRect);


    this.canvas.addEventListener('mousedown', e => {
      this.mouseX = e.offsetX * this.canvasPixelTimes;
      this.mouseY = e.offsetY * this.canvasPixelTimes;
      this.cellArr[Math.floor(this.mouseY * 32 / 400)][Math.floor(this.mouseX * 32 / 400)] = 1;
      this.draw();
    });
  }

  draw() {
    for (let y = 0; y < this.cellY; y++) {
      for (let x = 0; x < this.cellX; x++) {
        if (this.cellArr[y][x]) {
          this.ctx.fillRect(Math.floor((400 / 32) * x), Math.floor((400 / 32) * y), Math.floor(400 / 32), Math.floor(400 / 32));
        }
      }
    }
  }
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