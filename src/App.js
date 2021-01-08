import './main.scss'
import homeIcon from './img/home.svg'
import bellIcon from './img/bell.svg'
import messageIcon from './img/message.svg'
import profileIcon from './img/profile.svg'
import loadIcon from './img/loading.svg'
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
  const [data, setData] =useState();
  useEffect(()=>{
    const getUserData= async () =>{
      const  response = await axios.get('./timeline.json');
      console.log(response.data.users[0].tags);
      setData(response.data);
    }
    getUserData();
  },[]);
  if (!data) return <img src={loadIcon} className={'load-icon'}  alt="読込中" />;
  return (<>
  <div className={`profile-container`}>
    <div className={`profile-main-container grid`}>
      <div className={`left-container`}>
        <img src={loadIcon} className={'profile-icon'}  alt="読込中" />
        <h2>{data.users[0].name}</h2>
        <h3>@{data.users[0].screen_id}</h3>
        <div className={`follow-container`}>
          <p>フォロー{data.users[0].follow.length}</p>
          <p>フォロワー{data.users[0].follower.length}</p>
        </div>
      </div>
      <div className={`right-container`}>
        {data.users[0].tags.map(item =>
            <p className={`
            flex 
            items-center
            justify-center
            px-1
            py-1
            border
            border-transparent 
            text-base 
            font-medium 
            rounded-md 
            text-white 
            bg-indigo-600 
            hover:bg-indigo-700 
            md:py-4 
            md:text-lg 
            md:px-10
            tags
            `}>
              {item}
            </p>
        )}
      </div>
    </div>


    <div>
      <p className={` w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10`}>
        フォントを見る
      </p>
    </div>
    <div className={`posts-container`}>
      {data.posts.map(item => item.user.id==data.users[0].id ?(
          <div className={"ml-3 inline-flex rounded-md box-container"} >
            <div className={`
                         items-center
                         justify-center
                         px-5
                         py-3
                         border
                         border-transparent
                         text-base
                         font-medium
                         rounded-md
                         text-indigo-600
                         hover:bg-indigo-50i
                         post-card
                         `}>
              <p className={`
                          text-lg
                          name-tag`}>
                {item.user.name}
              </p>
              <p className={`
                         px-5 
                         py-3` }>
                {item.text}
              </p>
            </div>

          </div>
      ):(''))}
    </div>
  </div>
  </>);
}

function Timeline() {
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('./timeline.json');
      console.log(response.data)
      setData(response.data);
    }
    getData();
  }, []);
  if (!data) return <img src={loadIcon} className={'load-icon'}  alt="読込中" />;
  return (<>
    {data.posts.map(item => (
        <div className={"ml-3 inline-flex rounded-md box-container"} >
          <div className={`
                         items-center
                         justify-center
                         px-5
                         py-3
                         border
                         border-transparent
                         text-base
                         font-medium
                         rounded-md
                         text-indigo-600
                         hover:bg-indigo-50i
                         post-card
                         `}>
            <p className={`
                          text-lg
                          name-tag`}>
              {item.user.name}
            </p>
            <p className={`
                         px-5 
                         py-3` }>
              {item.text}
            </p>
            <div className={`post-bottom`}>

            </div>
          </div>
        </div>


      //<li key={item.id}>{item.text}</li>
    ))}
  </>);
}