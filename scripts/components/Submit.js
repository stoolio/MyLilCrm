import React from 'react';

import Column from './layout/Column';

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
        <Column cols={{small: 9}} offset={{small: 3}}>
          <button onClick={this.onClick} type='submit' className='btn btn-primary'>
            {this.props.children || 'Submit'}
          </button>
        </Column>
      </div>
    );
  }
});

export default Submit;
