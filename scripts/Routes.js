import React from 'react';
import App from './App';
import {Route, DefaultRoute, Link, RouteHandler} from 'react-router';

let Routes = (
  <Route name='app' path='/' handler={App} />
);

export default Routes;
