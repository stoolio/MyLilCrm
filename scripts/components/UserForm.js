import React from 'react';

const UserForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    publishChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  handleChange() {
    let username = React.findDOMNode(this.refs.user).value;
    let password = React.findDOMNode(this.refs.pass).value;
    this.props.publishChange({
      username,
      password
    })
  },
  render() {
    return (
      <form className='form-horizontal'>
        <div className='form-group'>
          <label htmlFor='inputEmail3' className='col-sm-2 control-label'>Username</label>
          <div className='col-sm-10'>
            <input value={this.props.username} onChange={this.handleChange} ref='user' type='email' className='form-control' id='inputEmail3' placeholder='Email' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='inputPassword3' className='col-sm-2 control-label'>Password</label>
          <div className='col-sm-10'>
            <input value={this.props.password} onChange={this.handleChange} ref='pass' type='password' className='form-control' id='inputPassword3' placeholder='Password' />
          </div>
        </div>
        <div className='form-group'>
          <div className='col-sm-offset-2 col-sm-10'>
            <button onClick={this.props.onSubmit} type='submit' className='btn btn-default'>{this.props.action}</button>
          </div>
        </div>
      </form>
    );
  }
});

export default UserForm;
