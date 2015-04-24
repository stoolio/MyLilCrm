import React from 'react';
import {Link} from 'react-router';

import Reflux from 'reflux';

import ContactActions from './../actions/Contacts';
import ContactStore from './../stores/Contacts';

const Contact = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired
  },
  delete(e) {
    e.preventDefault();
    ContactActions.remove(this.props.contact._id);
  },
  render() {
    let {name, email, phone} = this.props.contact;
    return (
      <tr>
        <td>{name.last}</td>
        <td>{name.first}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td><a href='#' onClick={this.delete}><span className='glyphicon glyphicon-remove'></span></a></td>
      </tr>
    );
  }
});

const ListContacts = React.createClass({
  propTypes: {
    contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  },
  getInitialState() {
    this.dir = {
      'name.last': 1,
      'name.first': 1,
      'phone': 1,
      'email': 1
    };
    return {};
  },
  componentDidMount() {
    ContactActions.load();
  },
  sort(e) {
    e.preventDefault();
    let by = e.target.dataset.by;
    this.dir[by] = this.dir[by] * -1;
    ContactActions.sort(by, this.dir[by]);
  },
  render() {
    let contacts = this.props.contacts.map((contact) => {
      return (
        <Contact key={contact._id} contact={contact} />
      );
    });
    return (
      <table className='table table-striped'>
        <tbody>
          <tr>
            <th>
              <a href='#' onClick={this.sort} data-by='name.last'>
                Last Name
              </a>
            </th>
            <th>
              <a href='#' onClick={this.sort} data-by='name.first'>
                First Name
              </a>
            </th>
            <th>
              <a href='#' onClick={this.sort} data-by='email'>
                Email
              </a>
            </th>
            <th>
              <a href='#' onClick={this.sort} data-by='phone'>
                Phone
              </a>
            </th>
            <th>
              Delete
            </th>
          </tr>
          {contacts}
        </tbody>
      </table>
    );
  }
});

export default ListContacts;
