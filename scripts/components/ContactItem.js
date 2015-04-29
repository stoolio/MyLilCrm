import React from 'react';

const ContactItem = React.createClass({
  propTypes: {
    contact: React.PropTypes.object.isRequired,
    onRemove: React.PropTypes.func.isRequired
  },
  onRemove(e) {
    this.props.onRemove(this.props.contact._id);
  },
  render() {
    let {name, email, phone} = this.props.contact;
    return (
      <tr>
        <td>{name.last}</td>
        <td>{name.first}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td><a href='#' onClick={this.onRemove}><span className='glyphicon glyphicon-remove'></span></a></td>
      </tr>
    );
  }
});

export default ContactItem;
