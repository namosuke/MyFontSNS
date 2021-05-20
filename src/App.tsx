import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Notifications from './views/Notifications';
import Profile from './views/Profile';
import Timeline from './views/Timeline';
import Messages from './views/Messages';
import FontSet from './views/FontSet';
import Header from './components/Header';
import Footer from './components/Footer';

import './main.scss';

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Timeline} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/messages" component={Messages} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/font/set" component={FontSet} />
      <Redirect to="/" />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
