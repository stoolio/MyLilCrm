import React, {PropTypes} from 'react';

import {bootstrap, sizes} from './bootstrapHelpers';

const ButtonGroup = React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    buttons: PropTypes.object.isRequired,
    size: PropTypes.oneOf(sizes),
    vertical: PropTypes.bool,
    justified: PropTypes.bool
  },
  getDefaultProps() {
    return {
      size: 'default',
      vertical: false,
      justified: false
    };
  },
  render() {
    let {label, size, vertical, justified} = this.props;

    let buttons = this.props.buttons.map(button => {
      <Button {...button} />
    })
    return (
     <div className={bootstrap('btn-group', size, vertical, justified)}
          role='group'
          aria-label={label}>
      {buttons}
     </div>
    );
  }

});

export default ButtonGroup;
