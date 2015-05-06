import Reflux from 'reflux';
import defaults from 'lodash/object/defaults';

import MessageActions from '../actions/MessageActions';

let id = 0;

const MessageStore = Reflux.createStore({
  listenables: MessageActions,
  init() {
    this.messages = [];
  },
  getInitialState() {
    return [];
  },
  onAdd(message) {
    defaults(message, {
      stick: false,
      type: 'info'
    });
    message.key = `msg_${++id}`;
    this.messages.push(message);
    this.trigger(this.messages);
  },
  onClear() {
    this.messages = this.messages.filter(message => {
      return message.sticky;
    });
  },
  onRemove(i) {
    this.messages = this.messages.length === 1 ?
      [] :
      this.messages.splice(i, 1);
    this.trigger(this.messages);
  }
});

export default MessageStore;
