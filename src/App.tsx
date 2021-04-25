import './main.scss';

import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import NotificationView from './views/NotificationView';
import ProfileView from './views/ProfileView';
import TimelineView from './views/TimelineView';
import MessageView from './views/MessageView';

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
