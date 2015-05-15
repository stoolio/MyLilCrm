import React from 'react';
import {Navigation} from 'react-router';

import {Row, Column} from '../components/layout/';

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
      <Row>
        <Column cols={{large: 6}}>
          <ContactForm suggestions={suggestions}
                       verifiedAddress={verifiedAddress}
                       onSubmit={this.add} />
        </Column>
      </Row>
    );
  }
});

export default ContactsNew;
