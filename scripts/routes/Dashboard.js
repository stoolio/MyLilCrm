import React from 'react';

import {shape} from '../../app/validation/diamonds';

import DiamondShape from '../components/DiamondShape';

const Dashboard = React.createClass({
  render() {
    return (
      <div>
        <h1>Insert Dashboard Here</h1>
        {shape.map(s => {
          return (
            <DiamondShape shape={s} size='75' float={true} />
          );
        })}
      </div>
    );
  }
});

export default Dashboard;
