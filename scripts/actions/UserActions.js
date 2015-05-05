import Reflux from 'reflux';

const UserActions = Reflux.createActions([
  'load',
  'create',
  'login',
  'logout'
]);

export default UserActions;
