import React, {PropTypes} from 'react';

import {bootstrap} from './bootstrapHelpers';

const Button = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    type: PropTypes.oneOf('submit button'.split(' ')),
    style: PropTypes.oneOf('default primary success info warning danger link'.split(' ')),
    size: PropTypes.oneOf('xsmall small default large'.split(' '))
  },
  getDefaultProps() {
    return {
      onClick: () => { },
      type: 'button',
      style: 'default',
      size: 'default'
    };
  },
  onClick() {
    e.preventDefault();
    this.props.onClick();
  },
  render() {
    let {name, onClick, type, style, size} = this.props;

    let props = {
      onClick,
      type,
      className: bootstrap('btn', size, style)
    };

    return (
      <button {...props}>
        {this.props.name}
      </button>
    );
  }

});

export default Button;
