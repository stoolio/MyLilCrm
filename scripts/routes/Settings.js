import React from 'react';
import {RouteHandler, State} from 'react-router';

import {Row, Column} from '../components/layout/';

import PageHeader from '../components/layout/PageHeader';
import Nav from '../components/layout/Nav';

const Settings = React.createClass({
  mixins: [State],
  render() {
    let sub = this.getPathname().split(/\/settings\//)[1];
    return (
      <Row>
        <PageHeader title='Settings' sub={sub} />
        <Column cols={{small: 3}}>
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
        </Column>
        <Column cols={{small: 9}}>
          <RouteHandler {...this.props} />
        </Column>
      </Row>
    );
  }
});

export default Settings;
