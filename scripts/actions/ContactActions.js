import Reflux from 'reflux';

const ContactActions = Reflux.createActions([
  'load',
  'add',
  'remove',
  'sort',
  'search'
]);

export default ContactActions;
