import React from 'react';

import Field from './Field';
import Submit from './Submit';

const NewContact = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      fullName: '',
      email: '',
      phone: ''
    };
  },
  onClick() {
    this.props.onSubmit(this.state);
  },
  handleChange(prop) {
    return (value) => {
      let newState = {};
      newState[prop] = value;
      this.setState(newState);
    };
  },
  render() {
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <form className='form-horizontal'>
            <Field value={this.state.fullName} publishChange={this.handleChange('fullName')} name='Name' type='text' placeholder='First & Last Name' />
            <Field value={this.state.email} publishChange={this.handleChange('email')}  name='Email' type='email' placeholder='Email' />
            <Field value={this.state.phone} publishChange={this.handleChange('phone')}  name='Phone' type='tel' placeholder='Phone Number' />
            <Submit onClick={this.onClick} />
          </form>
        </div>
      </div>
    );
  }
});

export default NewContact;
