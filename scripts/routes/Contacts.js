import React from 'react';
import {RouteHandler} from 'react-router';

import FullRow from '../components/layout/FullRow';
import PageHeader from '../components/layout/PageHeader';

const Contacts = React.createClass({
  render() {
    return (
      <FullRow>
        <PageHeader title='Contacts' />
        <RouteHandler {...this.props} />
      </FullRow>
    );
  }
});

export default Contacts;
