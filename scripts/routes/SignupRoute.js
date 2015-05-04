import React from 'react';

import UserActions from '../actions/UserActions';

import UserForm from '../components/UserForm';

const SignupRote = React.createClass({
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
