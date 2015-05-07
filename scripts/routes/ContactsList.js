import React from 'react';
import {Link} from 'react-router';
import ContactList from '../components/ContactList';
import AutoSearch from '../components/AutoSearch';

import ContactActions from './../actions/ContactActions';

const ListContacts = React.createClass({
  propTypes: {
    contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  componentDidMount() {
    ContactActions.load();
  },
  onSort(by) {
    ContactActions.sort(by);
  },
  onRemove(id) {
    ContactActions.remove(id);
  },
  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-6'>
            <AutoSearch placeholder='Search Contacts...'
                    search={ContactActions.search} />
          </div>
          <div className='col-md-offset-2 col-md-4'>
            <Link to='/contacts/new' className='btn btn-default'>
              Create New
            </Link>
          </div>
        </div>
        <ContactList onSort={this.onSort} onRemove={this.onRemove} contacts={this.props.contacts} />
      </div>
    );
  }
});

export default ListContacts;
