import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './layout/Header';
import Flash from './components/Flash';

import Reflux from 'reflux';
import StateStore from './stores/StateStore';

const App = React.createClass({
  mixins: [Reflux.connect(StateStore)],
  render() {
    return (
      <div className='container'>
        <Flash messages={this.state.messages} />
        <Header currentUser={this.state.currentUser} />
        <RouteHandler {...this.state} />
      </div>
    );
  }
});

export default App;
