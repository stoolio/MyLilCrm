import Reflux from 'reflux';

const LeadActions = Reflux.createActions([
  'load',
  'add',
  'addNote',
  'show',
  'sort',
  'filter',
  'search'
]);

export default LeadActions;
