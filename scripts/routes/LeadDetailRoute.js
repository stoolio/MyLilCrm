import React from 'react';

import LeadDetail from '../components/LeadDetail';

import LeadActions from '../actions/LeadActions';
import UserActions from '../actions/UserActions';
import MessageActions from '../actions/MessageActions';

const LeadDetailRoute = React.createClass({
  propTypes: {
    lead: React.PropTypes.object
  },
  getInitialState() {
    return {
      subject: '',
      content: ''
    };
  },
  componentWillMount() {
    UserActions.load();
  },
  subjectChange(e) {
    this.setState({
      subject: e
    })
  },
  contentChange(e) {
    this.setState({
      content: e
    })
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
    LeadActions.addNote(this.props.lead._id, {
      user: this.props.currentUser._id,
      subject: this.state.subject,
      content: this.state.content
    });
    this.replaceState({
      subject: '',
      content: ''
    });
  },
  render() {
    return (
      <LeadDetail users={this.props.users}
                  key={this.props.lead._id}
                  lead={this.props.lead}
                  subject={this.state.subject}
                  content={this.state.content}
                  subjectChange={this.subjectChange}
                  contentChange={this.contentChange}
                  createNote={this.onSubmit} />
    );
  }
});

export default LeadDetailRoute;
