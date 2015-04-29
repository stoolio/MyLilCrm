import React from 'react';
import LeadActions from '../actions/Lead';

const LeadDetail = React.createClass({
  render() {
    let keys = Object.keys(this.props.lead)
    let data = keys.map((prop) => {
      return (
        <li>{this.props.lead[prop]}</li>
      );
    })

    return (
      <ul>
        {data}
      </ul>
    );
  }
});

export default LeadDetail;
