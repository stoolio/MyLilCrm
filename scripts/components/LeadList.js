import React from 'react';
import {Link} from 'react-router';

const LeadList = React.createClass({
  propTypes: {
    leads: React.PropTypes.arrayOf(React.PropTypes.object),
    onClick: React.PropTypes.func
  },

  onClick(e) {
    if(e.target.tagName === 'A') {
      let id = e.target.dataset.id;
      if(id !== undefined) {
        this.props.onClick(id);
      }
    }
  },

  render() {
    let leads = this.props.leads.map(lead => {
      return (
        <li key={lead._id} >
          <Link to='lead' params={{id: lead._id}} data-id={lead._id}>
            {lead.contact === null ?
               'Unknown Name' :
               lead.contact.name.last + ', ' + lead.contact.name.first}
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
