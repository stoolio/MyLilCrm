import React from 'react';
import {Link, RouteHandler} from 'react-router';

import {FullRow, Row, Column} from '../components/layout/';

import AutoSearch from '../components/AutoSearch';
import Nav from '../components/layout/Nav';
import LeadList from '../components/LeadList';

import LeadActions from '../actions/LeadActions';
import SettingsActions from '../actions/SettingsActions';

const Leads = React.createClass({
  componentWillMount() {
    LeadActions.load();
    SettingsActions.load();
  },
  render() {
    let buttons = this.props.leadStages.map(stage => {
      return {
        to: 'leads-default',
        query: {stage: stage.name},
        name: stage.name
      };
    });
    return (
      <FullRow>
        <div className='page-header row'>
            <Column cols={{medium: 6}}>
              <h1>Leads</h1>
            </Column>
            <Column cols={{medium: 4}} offset={{medium: 2}}>
              <Link to='leadsNew' className='btn btn-default'>
                Create New
              </Link>
            </Column>
        </div>
        <Row>
          <Column cols={{small: 3}}>
            <Nav>{buttons}</Nav>
            <AutoSearch placeholder='Search Leads' search={LeadActions.search} />
            <LeadList leads={this.props.leads} onClick={LeadActions.show} />
          </Column>
          <Column cols={{small: 9}}>
            <RouteHandler {...this.props} />
          </Column>
        </Row>
      </FullRow>
    );
  }
});

export default Leads;
