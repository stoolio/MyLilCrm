import React from 'react';
import {run} from 'react-router';
import App from './App';
import Routes from './Routes';
import './index';

run(Routes, function(Handler) {
  React.render(<Handler />, document.getElementById('root'));
});
