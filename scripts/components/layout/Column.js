import React, {PropTypes} from 'react';

import {column} from '../layout/bootstrapHelpers';

const Column = React.createClass({
  propTypes: {
    cols: PropTypes.object,
    offset: PropTypes.object
  },
  getDefaultProps() {
    return {
      cols: {medium: 12},
      offset: {}
    };
  },
  render() {
    let {cols, offset} = this.props;
    return (
      <div className={column(cols, offset)}>
        {this.props.children}
      </div>
    );
  }

});

export default Column;
