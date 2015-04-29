import React from 'react';

import ContactActions from './../actions/Contacts';

const Field = React.createClass({
  handleChange(e) {
    e.preventDefault()
    this.props.publishChange(e.target.value);
  },
  render() {
    let tag = 'input' + this.props.name;
    return (
      <div className='form-group'>
        <label htmlFor={tag} className='col-sm-2 control-label'>
          {this.props.name}
        </label>
        <div className='col-sm-10'>
          <input  value={this.props.value}
                  onChange={this.handleChange}
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  id={tag}
                  className='form-control' />
        </div>
      </div>
    );
  }
});

const Submit = React.createClass({
  render() {
    return (
      <div className='form-group'>
        <div className='col-sm-offset-2 col-sm-10'>
          <button onClick={this.props.onClick} type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    );
  }
});

const NewContact = React.createClass({
  getInitialState() {
    return {
      fullName: '',
      email: '',
      phone: ''
    };
  },
  add() {
    ContactActions.add(this.state);
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
            <Submit onClick={this.add} />
          </form>
        </div>
      </div>
    );
  }
});

export default NewContact;
