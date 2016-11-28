import React from 'react';
import {Route, IndexRoute, Redirect} from 'react-router';

import CalendarApp from './containers/CalendarApp/CalendarApp';
import NotFoundView from './views/NotFoundView/NotFoundView';

export default (
  <Route path="/">
    <IndexRoute component={CalendarApp}/>
    <Route path="404" component={NotFoundView}/>
    <Redirect from="*" to="404"/>
  </Route>
);
