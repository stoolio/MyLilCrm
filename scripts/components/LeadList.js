import React from 'react';
import {Link} from 'react-router';

const LeadList = React.createClass({
  propTypes: {
    leads: React.PropTypes.arrayOf(React.PropTypes.object),
    onClick: React.PropTypes.func
  },
  show(e) {
    if(e.target.tagName === 'A') {
      let id = e.target.dataset.id;
      // if(id !== undefined) this.props.onClick(id);
    }
  },
  render() {
    let leads = this.props.leads.map((lead) => {
      return (
        <li>
          <Link key={lead._id} to='lead' params={{id: lead._id}} onClick={this.show} data-id={lead._id}>
            {lead.contact.name.last + ', ' + lead.contact.name.first}
          </Link>
        </li>
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
