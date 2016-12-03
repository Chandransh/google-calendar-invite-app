import React from 'react';
import {Route, IndexRedirect, Redirect} from 'react-router';

import CalendarApp from './containers/CalendarApp/CalendarApp';
import Login from './components/Login/Login';
import Calendar from './components/Calendar/Calendar';
import NotFoundView from './views/NotFoundView/NotFoundView';

export default (
  <Route path="/" component={CalendarApp}>
    <IndexRedirect to="google-calendar-invite-app"/>
    <Route path="google-calendar-invite-app" component={Login}/>
    <Route path="google-calendar-invite-app/events" component={Calendar}/>
    <Route path="google-calendar-invite-app/404" component={NotFoundView}/>
    <Redirect from="*" to="google-calendar-invite-app/404"/>
  </Route>
);