import React, {PropTypes} from 'react';

import {column} from '../layout/bootstrapHelpers';

let stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

const Column = React.createClass({
  propTypes: {
    columns: PropTypes.object
    offset: PropTypes.object
  },
  getDefaultProps() {
    return {
      columns: {medium: 12}
      offset: {}
    };
  },
  render() {
    let {columns, offset} = this.props;
    return (
      <div classname={column(columns, offset)}>
        {this.props.children}
      </div>
    );
  }

});

export default Column;
