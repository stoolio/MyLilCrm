import React from 'react';
import App from './App';
import Dashboard from './routes/Dashboard';
import Contacts from './routes/Contacts';
import ContactsNew from './routes/ContactsNew';
import ContactsList from './routes/ContactsList';
import Leads from './routes/Leads';
import LeadsNew from './routes/LeadsNew';
import LeadDetailRoute from './routes/LeadDetailRoute';
import Settings from './routes/Settings';
import SettingsContacts from './routes/SettingsContacts';
import SettingsLeads from './routes/SettingsLeads';
import LoginRoute from './routes/LoginRoute';
import SignupRoute from './routes/SignupRoute';
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
    <DefaultRoute name='dashboard' handler={Dashboard} />
    <Route name='contacts' handler={Contacts}>
      <DefaultRoute name='contacts-default' handler={ContactsList} />
      <Route name='contactsNew' path='new' handler={ContactsNew} />
    </Route>
    <Route name='leads' handler={Leads}>
      <DefaultRoute name='leads-default' handler={Blank} />
      <Route name='leadsNew' path='new' handler={LeadsNew} />
      <Route name='lead' path=':id' handler={LeadDetailRoute} />
    </Route>
    <Route name='settings' handler={Settings}>
      <Route name='leadSettings' path='leads' handler={SettingsLeads} />
      <Route name='contactSettings' path='contacts' handler={SettingsContacts} />
    </Route>
    <Route name='login' handler={LoginRoute} />
    <Route name='signup' handler={SignupRoute} />
  </Route>
);

export default Routes;
