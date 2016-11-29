import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import CalendarApp from './containers/CalendarApp/CalendarApp';
import Login from './components/Login/Login';
import Calendar from './components/Calendar/Calendar';
import NotFoundView from './views/NotFoundView/NotFoundView';

export default (
  <Route path="/" component={CalendarApp}>
    <IndexRoute component={Login}/>
    <Route path="events" component={Calendar}/>
    <Route path="404" component={NotFoundView}/>
    <Redirect from="*" to="404"/>
  </Route>
);
