import React from 'react';

const Submit = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },
  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  },
  render() {
    return (
      <div className='form-group'>
        <div className='col-sm-offset-3 col-sm-9'>
          <button onClick={this.onClick} type='submit' className='btn btn-primary'>
            {this.props.children || 'Submit'}
          </button>
        </div>
      </div>
    );
  }
});

export default Submit;
