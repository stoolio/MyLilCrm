import React from 'react';

const ContactItem = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },
  onRemove(e) {
    e.preventDefault();
    this.props.onRemove(this.props.contact._id);
  },
  render() {
    let {name, email, phone, address} = this.props.contact;
    return (
      <tr>
        <td>{name.last}</td>
        <td>{name.first}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{(address && address.state) || 'None'}</td>
        <td><a href='#' onClick={this.onRemove}><span className='glyphicon glyphicon-remove'></span></a></td>
      </tr>
    );
  }
});

export default ContactItem;
