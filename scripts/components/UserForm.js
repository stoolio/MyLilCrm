import React from 'react';

const UserForm = React.createClass({
  propTypes: {
    action: React.PropTypes.string.isRequired,
    fields: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },
  handleChange(setter) {
    return e => {
      e.preventDefault();
      let {target: {value}} = e;
      setter(value);
    }
  },
  render() {
    const {username, password} = this.props.fields;
    return (
      <form className='form-horizontal'>
        <div className='form-group'>
          <label htmlFor='inputEmail3' className='col-sm-2 control-label'>Username</label>
          <div className='col-sm-10'>
            <input value={username()} onChange={this.handleChange(username)} ref='user' type='email' className='form-control' id='inputEmail3' placeholder='Email' />
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='inputPassword3' className='col-sm-2 control-label'>Password</label>
          <div className='col-sm-10'>
            <input value={password()} onChange={this.handleChange(password)} ref='pass' type='password' className='form-control' id='inputPassword3' placeholder='Password' />
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
