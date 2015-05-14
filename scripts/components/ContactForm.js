import React, {PropTypes} from 'react';

import Field from './Field';
import Submit from './Submit';
import AddressAutocomplete from './AddressAutocomplete';

const ContactForm = React.createClass({
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    verifiedAddress: PropTypes.string
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
    const {verifiedAddress, suggestions} = this.props;
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <form className='form-horizontal'>
            <Field value={this.state.fullName} publishChange={this.handleChange('fullName')} name='Name' type='text' placeholder='First & Last Name' />
            <AddressAutocomplete value={verifiedAddress} suggestions={suggestions} />
            <Field value={this.state.email} publishChange={this.handleChange('email')}  name='Email' type='email' placeholder='Email' />
            <Field value={this.state.phone} publishChange={this.handleChange('phone')}  name='Phone' type='tel' placeholder='Phone Number' />
            <Submit onClick={this.onClick} />
          </form>
        </div>
      </div>
    );
  }
});

export default ContactForm;
