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
    message.sticky = message.sticky || false;
    message.type = message.type || 'info';
    message.key = ++id;
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
