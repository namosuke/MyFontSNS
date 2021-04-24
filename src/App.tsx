import './main.scss';

import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import NotificationView from './view/NotificationView';
import ProfileView from './view/ProfileView';
import TimelineView from './view/TimelineView';
import MessageView from './view/MessageView';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={TimelineView} />
      <Route exact path="/profile" component={ProfileView} />
      <Route path="/messages" component={MessageView} />
      <Route path="/notifications" component={NotificationView} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
