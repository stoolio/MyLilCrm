import React from 'react';

const LeadDetail = React.createClass({
  propTypes: {
    lead: React.PropTypes.object.isRequired
  },
  render() {
    let keys = Object.keys(this.props.lead)
    let data = keys.map((key) => {
      if(key.indexOf('_id') !== -1) return false;
      return (
        <li>{this.props.lead[key]}</li>
      );
    }).filter((data) => { return !!data });

    return (
      <ul>
        {data}
      </ul>
    );
  }
});

export default LeadDetail;
