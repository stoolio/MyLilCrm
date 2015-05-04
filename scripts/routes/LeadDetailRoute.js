import React from 'react';
import LeadDetail from '../components/LeadDetail';

import LeadActions from '../actions/LeadActions';

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
    if(!!this.props.currentUser) return;
    LeadActions.addNote(this.props.lead._id, {
      user: this.props.currentUser._id,
      subject: this.state.subject,
      content: this.state.content
    });
  },
  render() {
    return (
      <LeadDetail key={this.props.lead._id}
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
