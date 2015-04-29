import React from 'react';

import ContactForm from '../components/ContactForm';

import ContactActions from './../actions/Contacts';

const ContactsNew = React.createClass({
  add(data) {
    ContactActions.add(data);
  },
  render() {
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <ContactForm onSubmit={ContactActions.add} />
        </div>
      </div>
    );
  }
});

export default ContactsNew;
