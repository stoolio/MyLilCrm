import Reflux from 'reflux';

let ContactActions = Reflux.createActions([
  'load',
  'add',
  'remove',
  'sort',
  'search'
]);

export default ContactActions;
