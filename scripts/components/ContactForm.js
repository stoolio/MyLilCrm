import React, {PropTypes} from 'react';

import {Row, Column} from './layout/';

import Field from './Field';
import Submit from './Submit';
import Autocomplete from './Autocomplete';

import AddressActions from '../actions/AddressActions';

const ContactForm = React.createClass({
  propTypes: {
    onSubmit: PropTypes.func.isRequired,
    suggestions: PropTypes.arrayOf(PropTypes.string),
    verifiedAddress: PropTypes.string
  },
  getInitialState() {
    return {
      fullName: '',
      address: '',
      email: '',
      phone: ''
    };
  },
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.verifiedAddress !== '' &&
      this.props.verifiedAddress !== nextProps.verifiedAddress) {
      this.setState({
        address: nextProps.verifiedAddress
      });
    }
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
  selectAddress(addr) {
    if (addr === 'No suggestions') return;
    AddressActions.verify(addr);
  },
  render() {
    const {verifiedAddress, suggestions} = this.props;
    return (
      <Row>
        <Column cols={{large: 6}}>
          <form className='form-horizontal'>
            <Field
              value={this.state.fullName}
              publishChange={this.handleChange('fullName')}
              name='Name'
              type='text'
              placeholder='First & Last Name' />
            <Autocomplete
              value={this.state.address}
              suggestions={suggestions}
              handleChange={this.handleChange('address')}
              autocomplete={AddressActions.autocomplete}
              handleSelect={this.selectAddress} />
            <Field
              value={this.state.email}
              publishChange={this.handleChange('email')}
              name='Email'
              type='email'
              placeholder='Email' />
            <Field
              value={this.state.phone}
              publishChange={this.handleChange('phone')}
              name='Phone'
              type='tel'
              placeholder='Phone Number' />
            <Submit onClick={this.onClick} />
          </form>
        </Column>
      </Row>
    );
  }
});

export default ContactForm;
