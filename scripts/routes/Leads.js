import React from 'react';
import {Link, RouteHandler} from 'react-router';

import LeadList from '../components/LeadList';

import LeadActions from '../actions/LeadActions';

const Leads = React.createClass({
  componentWillMount() {
    LeadActions.load();
  },
  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='page-header'>
              <h1>Leads</h1>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <Link to='leadsNew' className='btn btn-default'>
                Create New
              </Link>
              <LeadList leads={this.props.leads} onClick={LeadActions.show} />
            </div>
            <div className='col-sm-9'>
              <RouteHandler {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Leads;
