import React from 'react';
import {RouteHandler, Link} from 'react-router';

const Contacts = React.createClass({
  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <h1>Contacts</h1>
          <Link to='/contacts/new' className='btn btn-default'>
            Create New
          </Link>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

export default Contacts;
