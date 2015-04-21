import React from 'react';
import {run} from 'react-router';
import Routes from './Routes';
import './index.scss';

run(Routes, function(Handler) {
  React.render(<Handler />, document.getElementById('root'));
});
