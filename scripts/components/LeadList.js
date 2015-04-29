import React from 'react';
import {Link} from 'react-router';

const LeadList = React.createClass({
  propTypes: {
    leads: React.PropTypes.arrayOf(React.PropTypes.object),
    onClick: React.PropTypes.func
  },
  show(e) {
    if(e.target.tagName === 'LI') {
      let id = e.target.dataset.id;
      if(id !== undefined) this.props.onClick(id);
    }
  },
  render() {
    let leads = this.props.leads.map((lead) => {
      console.log(lead);
      return (
        <Link key={lead._id} to='lead' params={{id: lead._id}} onClick={this.show} data-id={lead._id}>
          <li>{lead.contact.name.last + ', ' + lead.contact.name.first}</li>
        </Link>
      );
    });

    return (
      <ul onClick={this.onClick}>
        {leads}
      </ul>
    );
  }
});

export default LeadList;
