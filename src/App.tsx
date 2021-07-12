import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import Notifications from './views/Notifications';
import Profile from './views/Profile';
import Timeline from './views/Timeline';
import Messages from './views/Messages';
import FontSet from './views/FontSet';
import Createpost from './views/Createpost';
import Header from './components/Header';
import Footer from './components/Footer';

import './main.scss';

const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" component={Timeline} />
      <Route sensitive path="/profile" component={Profile} />
      <Route sensitive path="/messages" component={Messages} />
      <Route sensitive path="/notifications" component={Notifications} />
      <Route sensitive path="/font/set" component={FontSet} />
      <Route sensitive path="/post" component={Createpost} />
      <Redirect to="/" />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
