import React from 'react';
import {Navigation} from 'react-router';

import ContactForm from '../components/ContactForm';

import ContactActions from './../actions/Contacts';

const ContactsNew = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  // mixins: [Navigation],
  add(data) {
    ContactActions.add(data);
    console.log('attempting to transition');
    this.context.router.transitionTo('contacts-default');
    // this.transitionTo('contacts-default');
  },
  render() {
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <ContactForm onSubmit={this.add} />
        </div>
      </div>
    );
  }
});

export default ContactsNew;
