import React from 'react';
import {Link, RouteHandler} from 'react-router';

import AutoSearch from '../components/AutoSearch';
import Nav from '../layout/Nav';
import LeadList from '../components/LeadList';

import LeadActions from '../actions/LeadActions';

const Leads = React.createClass({
  componentWillMount() {
    LeadActions.load();
  },
  render() {
    let buttons = this.props.leadStages.map(stage => {
      return {
        to: 
        name: ,
      };
    });
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='page-header row'>
              <div className='col-md-6'>
                <h1>Leads</h1>
              </div>
              <div className='col-md-offset-2 col-md-4'>
                <Link to='leadsNew' className='btn btn-default'>
                  Create New
                </Link>
              </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'>
              <Nav />
              <AutoSearch placeholder='Search Leads' search={LeadActions.search} />
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
