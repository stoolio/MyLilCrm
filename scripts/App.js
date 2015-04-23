import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './layout/Header';

import Reflux from 'reflux';
import ContactActions from './actions/Contacts';
import ContactStore from './stores/Contacts';

const App = React.createClass({
  mixins: [Reflux.connect(ContactStore, 'contacts')],
  render() {
    console.log(this.state.contacts);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Header />
            <RouteHandler contacts={this.state.contacts} />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
