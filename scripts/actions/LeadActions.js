import Reflux from 'reflux';

let LeadActions = Reflux.createActions([
  'load',
  'add',
  'addNote',
  'show',
  'sort',
  'filter',
  'search'
]);

export default LeadActions;
