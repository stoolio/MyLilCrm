import React from 'react';

import ContactItem from './ContactItem';

const ContactList = React.createClass({
  propTypes: {
    contacts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onSort: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },
  onSort(e) {
    e.preventDefault();
    if(e.target.dataset.by !== undefined) {
      this.props.onSort(e.target.dataset.by);
    }
  },
  render() {
    let contacts = this.props.contacts.map((contact) => {
      return (
        <ContactItem key={contact._id} contact={contact} onRemove={this.props.onRemove} />
      );
    });
    return (
      <table className='table table-striped'>
        <tbody>
          <tr onClick={this.onSort}>
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

export default ContactList;
