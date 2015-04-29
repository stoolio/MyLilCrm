import React from 'react';

import LeadForm from '../components/LeadForm';

import LeadActions from './../actions/Lead';
import ContactActions from '../actions/Contacts';

const LeadsNew = React.createClass({
  propTypes: {
    contacts: React.PropTypes.array
  },
  componentDidMount() {
    ContactActions.load();
  },
  render() {
    if(this.props.contacts.length === 0) {
      return (
        <h1>Loading...</h1>
      );
    }
    let options = this.props.contacts.map(function(contact) {
      return {
        name: `${contact.name.first} ${contact.name.last}`,
        value: contact._id
      };
    });
    options.unshift({
      name: 'Select Contact',
      value: ''
    });
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <LeadForm options={options} onSubmit={LeadActions.add} />
        </div>
      </div>
    );
  }
});

export default LeadsNew;
