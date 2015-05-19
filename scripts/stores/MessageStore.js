import Reflux from 'reflux';

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
    Object.assign({
      stick: false,
      type: 'info'
    }, message);
    message.key = `msg_${++id}`;
    this.messages.push(message);
    this.trigger(this.messages);
  },
  onClear() {
    this.messages = this.messages.filter(message => message.sticky);
  },
  onRemove(i) {
    this.messages.splice(i, 1);
    this.trigger(this.messages);
  }
});

export default MessageStore;
