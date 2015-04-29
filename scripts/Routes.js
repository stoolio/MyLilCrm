import React from 'react';
import App from './App';
import Contacts from './routes/Contacts';
import NewContact from './routes/NewContact';
import ListContacts from './routes/ListContacts';
import Leads from './routes/Leads';
import LeadDetail from './routes/LeadDetail';
import Dashboard from './routes/Dashboard';
import {Route, DefaultRoute, Link, RouteHandler} from 'react-router';

const Blank = React.createClass({
  render() {
    return (
      <div />
    );
  }
});

let Routes = (
  <Route name='app' path='/' handler={App}>
    <Route name='contacts' handler={Contacts}>
      <Route name='new' handler={NewContact} />
      <DefaultRoute name='contact-list' handler={ListContacts} />
    </Route>
    <Route name='leads' handler={Leads}>
      <DefaultRoute handler={Blank} />
      <Route name='lead' path=':id' handler={LeadDetail} />
    </Route>
    <DefaultRoute name='dashboard' handler={Dashboard} />
  </Route>
);

export default Routes;
