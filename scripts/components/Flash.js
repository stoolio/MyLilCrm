import {ReactComponentWithPureRenderMixin as PureRenderMixin} from 'react/lib/ReactComponentWithPureRenderMixin';
import React from 'react';
import Reflux from 'reflux';

import FlashMessage from './FlashMessage';

import MessageActions from '../actions/MessageActions';

const Flash = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    messages: React.PropTypes.array
  },
  remove(i) {
    return () => {
      MessageActions.remove(i);
    };
  },
  render() {
    if (this.props.messages.length === 0) return null;
    console.log('actual render');
    let messages = this.props.messages.map((message, i) => {
      return (
        <FlashMessage key={message.key} message={message} remove={this.remove(i)} />
      );
    });
    let style = {
      position: 'absolute',
      zIndex: 99,
      width: 350,
      right: 40,
      top: 70
    }
    return (
      <div className='flash-messages' style={style}>
        {messages}
      </div>
    );
  }
});

export default Flash;
