import React from 'react';
import {RouteHandler} from 'react-router';
import Header from './layout/Header';

const App = React.createClass({
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12'>
            <Header />
            <RouteHandler />
          </div>
        </div>
      </div>
    );
  }
});

export default App;
