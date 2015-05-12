import React from 'react';
import {RouteHandler, State} from 'react-router';

import PageHeader from '../components/layout/PageHeader';
import Nav from '../components/layout/Nav';

const Settings = React.createClass({
  mixins: [State],
  render() {
    let sub = this.getPathname().split(/\/settings\//)[1];
    return (
      <div className='row'>
        <PageHeader title='Settings' sub={sub} />
        <div className='col-sm-3'>
          <Nav type='pills' stacked>
            {[
              {
                to: 'contactSettings',
                name: 'Contacts'
              },
              {
                to: 'leadSettings',
                name: 'Leads'
              }
            ]}
          </Nav>
        </div>
        <div className='col-sm-9'>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

export default Settings;
