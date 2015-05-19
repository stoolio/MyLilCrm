import React from 'react';

import LeadDetail from '../components/LeadDetail';

import FormMixin from '../actions/FormMixin';
import LeadActions from '../actions/LeadActions';
import UserActions from '../actions/UserActions';
import MessageActions from '../actions/MessageActions';

const LeadDetailRoute = React.createClass({
  mixins: [FormMixin.Group('leadNote',[
    'subject',
    'content'
  ])],
  propTypes: {
    lead: React.PropTypes.object
  },
  componentWillMount() {
    UserActions.load();
  },
  onSubmit() {
    if(this.props.currentUser === false) {
      MessageActions.add({
        type: 'warning',
        callout: 'Error: ',
        message: 'You must be logged in to post notes'
      });
      return;
    }
    // LeadActions.addNote(this.props.lead._id, {
    //   user: this.props.currentUser._id,
    //   subject: this.subject(),
    //   content: this.content()
    // });
    this.submit(LeadActions.addNote, {
      _id: this.props.lead._id,
      user: this.props.currentUser._id
    });
  },
  render() {
    return (
      <LeadDetail
        users={this.props.users}
        key={this.props.lead._id}
        lead={this.props.lead}
        subject={this.subject}
        content={this.content}
        createNote={this.onSubmit} />
    );
  }
});

export default LeadDetailRoute;
