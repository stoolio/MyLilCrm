import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import {bootstrap, sizes} from './bootstrapHelpers';

const Button = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf('submit button'.split(' ')),
    style: PropTypes.oneOf('default primary success info warning danger link'.split(' ')),
    size: PropTypes.oneOf(sizes)
  },
  getDefaultProps() {
    style: 'default',
    size: 'default'
  },
  onClick() {
    e.preventDefault();
    this.props.onClick();
  }
  render() {
    let {name, onClick, type, style, size} = this.props;

    let props = {
      className: bootstrap('btn', size, style)
    };

    return (
      <Link className={bootstrap('btn', size, style)} role='button'>
        {this.props.name}
      </Link>
    );
  }

});

export default Button;
