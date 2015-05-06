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
        <Link key={lead._id} to='lead' params={{id: lead._id}} data-id={lead._id} className='list-group-item'>
          {lead.contact === null ?
             'Unknown Name' :
             lead.contact.name.last + ', ' + lead.contact.name.first}
        </Link>
      );
    });

    return (
      <div className='list-group' onClick={this.onClick}>
        {leads}
      </div>
    );
  }
});

export default LeadList;
