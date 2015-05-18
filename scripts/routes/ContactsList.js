import React from 'react';
import {Link} from 'react-router';

import {Row, Column} from '../components/layout/';

import ContactList from '../components/ContactList';
import AutoSearch from '../components/AutoSearch';

import ContactActions from './../actions/ContactActions';

const ListContacts = React.createClass({
  propTypes: {
    contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  getInitialState() {
    return {
      searchVal: ''
    };
  },
  componentDidMount() {
    ContactActions.load();
  },
  handleChange(val) {
    this.setState({
      searchVal: val
    });
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
        <Row>
          <Column cols={{medium: 6}}>
            <AutoSearch
              value={this.state.searchVal}
              placeholder='Search Contacts...'
              handleChange={this.handleChange}
              search={ContactActions.search} />
          </Column>
          <Column cols={{medium: 4}} offset={{medium: 2}}>
            <Link to='/contacts/new' className='btn btn-default'>
              Create New
            </Link>
          </Column>
        </Row>
        <ContactList
          onSort={this.onSort}
          onRemove={this.onRemove}
          contacts={this.props.contacts} />
      </div>
    );
  }
});

export default ListContacts;
