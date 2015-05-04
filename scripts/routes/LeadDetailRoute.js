import React from 'react';
import LeadDetail from '../components/LeadDetail';

import LeadActions from '../actions/Lead';

const LeadDetailRoute = React.createClass({
  propTypes: {
    lead: React.PropTypes.object
  },
  render() {
    return (
      <LeadDetail key={this.props.lead._id} lead={this.props.lead} />
    );
  }
});

export default LeadDetailRoute;
