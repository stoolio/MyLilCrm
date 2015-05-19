import React from 'react';
import {Navigation} from 'react-router';

import {Row, Column} from '../components/layout/';

import ContactForm from '../components/ContactForm';

import FormMixin from '../actions/FormMixin';
import ContactActions from '../actions/ContactActions';

const ContactsNew = React.createClass({
  mixins: [
    Navigation,
    FormMixin.Group('contactsNew', [
      'fullName',
      'address',
      'email',
      'phone'
    ])
  ],
  add(data) {
    this.submit(ContactActions.add);
    this.transitionTo('contacts-default');
  },
  render() {
    let {suggestions, verifiedAddress} = this.props;
    return (
      <Row>
        <Column cols={{large: 6}}>
          <ContactForm suggestions={suggestions}
                       fields={this.fields()}
                       onSubmit={this.add} />
        </Column>
      </Row>
    );
  }
});

export default ContactsNew;
