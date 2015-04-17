require('./shit.scss');
import React from 'react';
import {run} from 'react-router';
import App from './App';
import Routes from './Routes';

run(Routes, function(Handler) {
  React.render(<Handler />, document.getElementById('root'));
});
