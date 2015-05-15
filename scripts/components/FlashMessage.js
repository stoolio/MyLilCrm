import React from 'react';

import {bootstrap} from './layout/bootstrapHelpers';

const FlashMessage = React.createClass({
  propTypes: {
    message: React.PropTypes.object,
    remove: React.PropTypes.func.isRequired
  },
  render() {
    let {callout, message, type} = this.props.message;
    // let classes = `alert alert-${type} alert-dismissible`
    return (
      <div className={bootstrap('alert', false, type, 'dismissible')} role="alert">
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.remove}><span aria-hidden="true">&times;</span></button>
        <strong>{callout}</strong> {message}
      </div>
    );
  }
});

export default FlashMessage;
