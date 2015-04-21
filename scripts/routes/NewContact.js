import React from 'react';

// <label>
        //   {this.props.name}
        // </label>

const Field = React.createClass({
  render() {
    let tag = 'input' + this.props.name;
    return (
      <div className='form-group'>
        <label htmlFor={tag} className='col-sm-2 control-label'>
          {this.props.name}
        </label>
        <div className='col-sm-10'>
          <input id={tag} type={this.props.type} className='form-control' placeholder={this.props.placeholder} />
        </div>
      </div>
    );
  }
});

const Submit = React.createClass({
  render() {
    return (
      <div class='form-group'>
        <div className='col-sm-offset-2 col-sm-10'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    );
  }
});

const NewContact = React.createClass({
  render() {
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <form className='form-horizontal'>
            <Field name='Name' type='text' placeholder='First & Last Name' />
            <Field name='Email' type='email' placeholder='Email' />
            <Field name='Phone' type='tel' placeholder='Phone Number' />
            <Submit />
          </form>
        </div>
      </div>
    );
  }
});

export default NewContact;
