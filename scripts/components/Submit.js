import React from 'react';

const Submit = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  render() {
    return (
      <div className='form-group'>
        <div className='col-sm-offset-2 col-sm-10'>
          <button onClick={this.props.onClick} type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    );
  }
});

export default Submit;
