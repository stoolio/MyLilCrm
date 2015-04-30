import React from 'react';
import {State} from 'react-router';
import LeadDetail from '../components/LeadDetail';

import LeadActions from '../actions/Lead';

const LeadDetailRoute = React.createClass({
  mixins: [State],
  propTypes: {
    lead: React.PropTypes.object
  },
  componentWillMount() {
    LeadActions.show(this.getParams().id);
  },
  render() {
    return (
      <LeadDetail key={this.props.lead._id} lead={this.props.lead} />
    );
  }
});

export default LeadDetailRoute;
