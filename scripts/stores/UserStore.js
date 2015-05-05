import Reflux from 'reflux';

import UserActions from '../actions/UserActions';
import MessageActions from '../actions/MessageActions';

import Api from '../api/UserApi';

const UserStore = Reflux.createStore({
  listenables: [UserActions],
  init() {
    this.state = {
      users: {},
      currentUser: false,
    };
  },
  getInitialState() {
    this.state = {
      users: {},
      currentUser: false,
    };
    return this.state;
  },
  onLoad() {
    console.log('userstore state: ', this.state);
    Api.load((err, res) => {
      if (err) {
        console.log(err);
      } else {
        let users = JSON.parse(res.text).users;
        this.state.users = users.reduce((acc, user) => {
          acc[user._id] = user.username;
          return acc;
        }, {});
        this.trigger(this.state);
      }
    })
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
      if (login) {
        MessageActions.add({
          callout: 'Success!',
          message: `Logged in as ${user.username}.`,
          type: 'success'
        });
        this.update(user);
      } else {
        MessageActions.add({
          callout: 'Error: ',
          message: `Login failed...`,
          type: 'danger'
        });
      }
    })
  },
  onLogout() {
    this.update(false);
  },
  update(user) {
    this.state.currentUser = user;
    this.trigger(this.state);
  }
});

export default UserStore;
