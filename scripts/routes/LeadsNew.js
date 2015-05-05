import React from 'react';
// import {Navigation} from 'react-router';

import LeadForm from '../components/LeadForm';

import LeadActions from './../actions/LeadActions';
import ContactActions from '../actions/ContactActions';

const LeadsNew = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  // mixins: [Navigation],
  propTypes: {
    contacts: React.PropTypes.array
  },
  componentDidMount() {
    ContactActions.load();
  },
  onSubmit(lead) {
    LeadActions.add(lead);
    this.context.router.transitionTo('leads-default');
    // this.transitionTo('leads-default');
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
          <LeadForm options={options} onSubmit={this.onSubmit} />
        </div>
      </div>
    );
  }
});

export default LeadsNew;
