import React from 'react';
import {Navigation} from 'react-router';

import LeadForm from '../components/LeadForm';

import FormMixin from '../actions/FormMixin';
import LeadActions from '../actions/LeadActions';
import ContactActions from '../actions/ContactActions';
import SettingsActions from '../actions/SettingsActions';

  // getInitialState() {
  //   return {
  //     contact: '',
  //     stage: '',
  //     budget: {
  //       from: 0,
  //       to: 0
  //     },
  //     comments: ''
  //     // diamond: diamondRequestSchema,
  //     // setting: {
  //     //   images: [String],
  //     //   style: String,
  //     //   metal: {
  //     //     quality: Enum(validMetalQualities),
  //     //     color: Enum(validMetalColors)
  //     //   }
  //     // }
  //   };
  // },

const LeadsNew = React.createClass({
  mixins: [Navigation, FormMixin.Group('leadsNew', [
    'contact',
    'stage',
    'budgetFrom',
    'budgetTo',
    'comments'
  ])],
  propTypes: {
    contacts: React.PropTypes.array
  },
  componentDidMount() {
    SettingsActions.load();
    ContactActions.load();
  },
  onSubmit() {
    this.submit(LeadActions.add);
    this.transitionTo('leads-default');
  },
  render() {
    if(this.props.contacts.length === 0) {
      return (
        <h1>Loading...</h1>
      );
    }

    let options = this.props.contacts.
      map(contact => {
        return {
          name: `${contact.name.first} ${contact.name.last}`,
          value: contact._id
        };
      });
    options.unshift({
      name: 'Select Contact',
      value: ''
    });

    let stages = this.props.leadStages.
      map((stage, i) => {
        return {
          name: `${i + 1}: ${stage.name}`,
          value: stage._id
        };
      })
    stages.unshift({
      name: 'Select Initial Stage',
      value: ''
    });

    return (
      <LeadForm
        options={options}
        fields={this.fields()}
        stages={stages}
        onSubmit={this.onSubmit} />
    );
  }
});

export default LeadsNew;
