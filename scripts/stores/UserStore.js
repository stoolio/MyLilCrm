import Reflux from 'reflux';

import UserActions from '../actions/UserActions';
import MessageActions from '../actions/MessageActions';

import Api from '../api/UserApi';

const UserStore = Reflux.createStore({
  listenables: [UserActions],
  getInitialState() {
    this.currentUser = false;
    return this.currentUser;
  },
  onCreate(user) {
    Api.create(user, (err, res) => {
      if (err) {
        console.log(err);
      }
    })
  },
  onLogin(user) {
    Api.login(user, (err, res) => {
      let {login, user} = JSON.parse(res.text);
      console.log('onlogin: ', user);
      if (login) {
        MessageActions.add({
          callout: 'Success!',
          message: `Logged in as ${user.username}.`,
          type: 'success'
        });
        this.update(user);
      } else {
        console.log('Login Failed!');
      }
    })
  },
  onLogout() {
    this.update(false);
  },
  update(user) {
    this.currentUser = user;
    this.trigger(user);
  }
});

export default UserStore;
