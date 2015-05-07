import React from 'react';
import {RouteHandler, Link} from 'react-router';

import PageHeader from '../layout/PageHeader';

const Contacts = React.createClass({
  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <PageHeader title='Contacts' />
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

export default Contacts;
