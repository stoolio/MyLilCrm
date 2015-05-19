import React, {PropTypes} from 'react';

import {Row, Column} from './layout/';

import Field from './Field';
import Submit from './Submit';
import Autocomplete from './Autocomplete';
import SimpleAddressDisplay from './SimpleAddressDisplay';

import AddressActions from '../actions/AddressActions';

const ContactForm = React.createClass({
  propTypes: {
    suggestions: PropTypes.arrayOf(PropTypes.string),
    fields: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  },
  // componentWillReceiveProps(nextProps) {
  //   if (
  //     nextProps.verifiedAddress !== '' &&
  //     this.props.verifiedAddress !== nextProps.verifiedAddress) {
  //     this.setState({
  //       address: nextProps.verifiedAddress
  //     });
  //   }
  // },
  selectAddress(addr) {
    if (addr === 'No suggestions') return;
    AddressActions.verify(addr, this.props.fields.address);
  },
  render() {
    const {
      verifiedAddress,
      suggestions,
      fields: {
        fullName,
        address,
        email,
        phone
      }
    } = this.props;
    return (
      <Row>
        <Column cols={{large: 6}}>
          <form className='form-horizontal'>
            <Field
              value={fullName}
              name='Name'
              type='text'
              placeholder='First & Last Name' />
            <Autocomplete
              value={SimpleAddressDisplay(address)}
              suggestions={suggestions}
              autocomplete={AddressActions.autocomplete}
              handleSelect={this.selectAddress} />
            <Field
              value={email}
              name='Email'
              type='email'
              placeholder='Email' />
            <Field
              value={phone}
              name='Phone'
              type='tel'
              placeholder='Phone Number' />
            <Submit onClick={this.props.onSubmit} />
          </form>
        </Column>
      </Row>
    );
  }
});

export default ContactForm;
