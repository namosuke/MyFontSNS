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
    this.paperMarginLeft = 8;
    this.paperMarginTop = 8;
    this.paperWidth = 384;  // 32の倍数でないと隙間ができる
    this.paperHeight = 384;
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(this.paperMarginLeft + 0.5, this.paperMarginTop + 0.5, this.paperWidth, this.paperHeight);
    this.isDrawing = false;

    this.addCellPt = (mouseX, mouseY) => {
      this.cellArr[Math.floor((mouseY - this.paperMarginTop) * this.cellY / this.paperHeight)][Math.floor((mouseX - this.paperMarginLeft) * this.cellX / this.paperWidth)] = 1;
    }

    this.canvas.addEventListener('mousedown', e => {
      this.mouseX = e.offsetX * this.canvasPixelTimes;
      this.mouseY = e.offsetY * this.canvasPixelTimes;
      if (this.mouseX >= this.paperMarginLeft + this.paperWidth || this.mouseX < this.paperMarginLeft || this.mouseY >= this.paperMarginTop + this.paperHeight || this.mouseY < this.paperMarginTop) {
        return;
      }
      this.isDrawing = true;
      this.addCellPt(this.mouseX, this.mouseY);
      this.draw();
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
    });

    this.canvas.addEventListener('mousemove', e => {
      this.mouseX = e.offsetX * this.canvasPixelTimes;
      this.mouseY = e.offsetY * this.canvasPixelTimes;
      if (this.isDrawing === false || this.mouseX >= this.paperMarginLeft + this.paperWidth || this.mouseX < this.paperMarginLeft || this.mouseY >= this.paperMarginTop + this.paperHeight || this.mouseY < this.paperMarginTop) {
        return;
      }
      this.addCellPt(this.mouseX, this.mouseY);
      this.draw();
      this.lastMouseX = this.mouseX;
      this.lastMouseY = this.mouseY;
    });

    window.addEventListener('mouseup', () => {
      this.isDrawing = false;
    });
  }

  draw() {
    for (let y = 0; y < this.cellY; y++) {
      for (let x = 0; x < this.cellX; x++) {
        if (this.cellArr[y][x]) {
          this.ctx.fillRect(this.paperMarginLeft + Math.floor((this.paperWidth / this.cellX) * x), this.paperMarginTop + Math.floor((this.paperHeight / this.cellY) * y), Math.floor(this.paperWidth / this.cellX), Math.floor(this.paperHeight / this.cellY));
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