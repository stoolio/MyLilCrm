import React from 'react';

const FlashMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.object,
    remove: React.PropTypes.func.isRequired
  },
  render() {
    let {callout, message, type} = this.props.message;
    return (
      <div className={`alert alert-${type} alert-dismissible`} role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.remove}><span aria-hidden="true">&times;</span></button>
        <strong>{callout}</strong> {message}
      </div>
    );
  }
});

export default FlashMessage;
