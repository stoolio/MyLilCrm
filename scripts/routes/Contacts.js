import React from 'react';
import {RouteHandler, Link} from 'react-router';

const Contacts = React.createClass({
  render() {
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className='page-header'>
            <div className='row'>
              <div className='col-md-6'>
                <h1>Contacts</h1>
              </div>
              <div className='col-md-6'>
                <Link to='/contacts/new' className='btn btn-default'>
                  Create New
                </Link>
              </div>
            </div>
          </div>
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
});

export default Contacts;
