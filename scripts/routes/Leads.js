import React from 'react';
import {Link, RouteHandler, State} from 'react-router';

import {FullRow, Row, Column} from '../components/layout/';

import AutoSearch from '../components/AutoSearch';
import Nav from '../components/layout/Nav';
import LeadList from '../components/LeadList';

import LeadActions from '../actions/LeadActions';
import SettingsActions from '../actions/SettingsActions';

const Leads = React.createClass({
  mixins: [State],
  componentWillMount() {
    LeadActions.load();
    SettingsActions.load();
  },
  // componentWillUpdate() {
  //   const {stage} = this.getQuery();
  //   if (stage)
  //     LeadActions.filter(stage);
  //   else
  //     LeadActions.filter('');
  // },
  render() {
    const buttons = this.props.leadStages.map(stage => {
      if (this.getQuery().stage === stage.name) {
        return {
          to: 'leads-default',
          name: stage.name
        }
      }
      return {
        to: 'leads-default',
        query: {stage: stage.name},
        name: stage.name
      };
    });
    const {stage} = this.getQuery(),
          leads = !stage ? this.props.leads : this.props.leads.filter(lead => {
            if (!lead.stage) return false;
            return lead.stage.name === stage;
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
        <FullRow>
          <Nav>{buttons}</Nav>
        </FullRow>
        <Row>
          <Column cols={{small: 3}}>
            <AutoSearch placeholder='Search Leads' search={LeadActions.search} />
            <LeadList leads={leads} onClick={LeadActions.show} />
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
