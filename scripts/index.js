import React from 'react';
import {run} from 'react-router';
import Routes from './Routes';
import './index.scss';

run(Routes, function(Handler, state) {
  console.log('run->state: ', state);
  React.render(<Handler {...state} />, document.getElementById('root'));
});
