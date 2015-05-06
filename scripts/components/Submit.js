import React from 'react';

const Submit = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  render() {
    return (
      <div className='form-group'>
        <div className='col-sm-offset-3 col-sm-9'>
          <button onClick={this.props.onClick} type='submit' className='btn btn-primary'>
            Submit
          </button>
        </div>
      </div>
    );
  }
});

export default Submit;
