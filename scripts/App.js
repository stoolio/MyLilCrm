import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './layout/Header';

import Reflux from 'reflux';
import ContactActions from './actions/Contacts';
import ContactStore from './stores/Contacts';
import LeadStore from './stores/Lead';

const App = React.createClass({
  mixins: [
    Reflux.connect(ContactStore, 'contacts'),
    Reflux.connect(LeadStore, 'leads')],
  render() {
    console.log(this.state);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Header />
            <RouteHandler leads={this.state.leads.leads} lead={this.state.leads.lead} contacts={this.state.contacts} />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
