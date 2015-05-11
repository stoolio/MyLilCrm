import React from 'react';

const FormGroup = React.createClass({
  getDefaultProps() {
    return {
      className: ''
    };
  },
  render() {
    this.props.className += ' form-group';
    return (
      <div {...this.props} />
    );
  }
});

export default FormGroup;
