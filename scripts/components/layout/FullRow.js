import React from 'react';

import Row from './Row';
import Column from './Column';

const FullRow = React.createClass({
  render() {
    return (
      <Row>
        <Column cols={{large: 12}}>
          {this.props.children}
        </Column>
      </Row>
    );
  }

});

export default FullRow;
