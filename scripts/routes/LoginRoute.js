import React from 'react';
import {Link, Navigation} from 'react-router';

import UserActions from '../actions/UserActions';

import UserForm from '../components/UserForm';

const LoginRoute = React.createClass({
  mixins: [Navigation],
  getInitialState() {
    return {
      username: '',
      password: ''
    };
  },
  handleChange(state) {
    this.setState(state)
  },
  onSubmit(e) {
    e.preventDefault();
    UserActions.login(this.state);
    this.transitionTo('dashboard');
  },
  render() {
    return (
      <div>
        <UserForm action='Sign In'
                  username={this.state.username}
                  password={this.state.password}
                  publishChange={this.handleChange}
                  onSubmit={this.onSubmit} />
        <div>
          <p>
            Don't have an account? <Link to='signup'>Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
});

export default LoginRoute;
