import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './components/layout/Header';
import Flash from './components/Flash';

import Reflux from 'reflux';
import StateStore from './stores/StateStore';

const PageContainer = React.createClass({
  render() {
    return (
      <div className='container'>
        {this.props.children}
      </div>
    );
  }
});

const App = React.createClass({
  mixins: [Reflux.connect(StateStore)],
  render() {
    return (
      <PageContainer>
        <Flash messages={this.state.messages} />
        <Header currentUser={this.state.currentUser} />
        <RouteHandler {...this.state} />
      </PageContainer>
    );
  }
});

export default App;
