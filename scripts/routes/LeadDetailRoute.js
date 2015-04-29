import React from 'react';
import {State} from 'react-router';
import LeadDetail from '../components/LeadDetail';

import LeadActions from '../actions/Lead';

const LeadDetailRoute = React.createClass({
  mixins: [State],
  propTypes: {
    lead: React.PropTypes.object
  },
  componentDidMount() {
    LeadActions.show(this.getParams().id);
  },
  render() {
    console.log('route: ', this.props.lead);
    return (
      <LeadDetail lead={this.props.lead} />
    );
  }
});

export default LeadDetailRoute;
