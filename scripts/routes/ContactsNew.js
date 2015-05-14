import React from 'react';
import {Navigation} from 'react-router';

import ContactForm from '../components/ContactForm';

import ContactActions from './../actions/ContactActions';

const ContactsNew = React.createClass({
  mixins: [Navigation],
  add(data) {
    ContactActions.add(data);
    this.transitionTo('contacts-default');
  },
  render() {
    let {suggestions, verifiedAddress} = this.props;
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <ContactForm suggestions={suggestions}
                       verifiedAddress={verifiedAddress}
                       onSubmit={this.add} />
        </div>
      </div>
    );
  }
});

export default ContactsNew;
