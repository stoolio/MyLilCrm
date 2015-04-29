import React from 'react';
import {Link, RouteHandler} from 'react-router';
import LeadActions from '../actions/Lead';

const Leads = React.createClass({
  componentDidMount() {
    LeadActions.load();
  },
  show(e) {
    let id = e.dataset.id;
    LeadActions.show(id);
  },
  render() {
    console.log('in leads: ', this.props);
    let leads = this.props.leads.map((lead) => {
      return (
        <Link to='lead' params={{id: lead._id}} onClick={this.show} data-id={lead._id}>
          <li>{lead.contact.name.last + ', ' + lead.contact.name.first}</li>
        </Link>
      );
    });

    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='page-header'>
              <h1>Leads</h1>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <Link to='/contacts/new' className='btn btn-default'>
                Create New
              </Link>
              <ul>
                {leads}
              </ul>
            </div>
            <div className='col-md-6'>
              <RouteHandler {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Leads;
