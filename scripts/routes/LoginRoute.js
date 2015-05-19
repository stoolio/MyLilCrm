import React from 'react';
import {Link, Navigation} from 'react-router';

import UserForm from '../components/UserForm';

import FormMixin from '../actions/FormMixin';
import UserActions from '../actions/UserActions';

const LoginRoute = React.createClass({
  mixins: [Navigation, FormMixin.Group('login', [
    'username',
    'password'
  ])],
  handleChange(state) {
    this.setState(state)
  },
  onSubmit(e) {
    e.preventDefault();
    this.submit(UserActions.login, this.clear);
    // this.transitionTo('dashboard');
  },
  render() {
    return (
      <div>
        <UserForm
          action='Sign In'
          fields={this.fields()}
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
