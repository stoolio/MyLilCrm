import React from 'react';
import {HashLocation, run} from 'react-router';
import Routes from './Routes';
import './index.scss';

import MessageActions from './actions/MessageActions';

run(Routes, function(Handler, state) {
  console.log('run->state: ', state);
  React.render(<Handler {...state} />, document.getElementById('root'));
});
