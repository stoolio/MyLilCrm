import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './layout/Header';
import Flash from './components/Flash';

import Reflux from 'reflux';
import StateStore from './stores/StateStore';

const App = React.createClass({
  mixins: [Reflux.connect(StateStore)],
  render() {
    console.log(this.state);
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Flash messages={this.state.messages} />
            <Header currentUser={this.state.currentUser} />
            <RouteHandler {...this.state} />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
