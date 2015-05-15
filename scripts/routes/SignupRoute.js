import React from 'react';
import {Navigation} from 'react-router';

import UserForm from '../components/UserForm';

import UserActions from '../actions/UserActions';

const SignupRote = React.createClass({
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
    UserActions.create(this.state);
    this.transitionTo('login');
  },
  render() {
    return (
      <UserForm action='Sign Up'
                username={this.state.username}
                password={this.state.password}
                publishChange={this.handleChange}
                onSubmit={this.onSubmit} />
    );
  }
});

export default SignupRote;
