import React from 'react';

import ContactList from '../components/ContactList';
import ContactSearch from '../components/ContactSearch';

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
        <ContactSearch placeholder='Search Contacts...' displayResults={false} />
        <ContactList onSort={this.onSort} onRemove={this.onRemove} contacts={this.props.contacts} />
      </div>
    );
  }
});

export default ListContacts;
