import React from 'react';

const Row = React.createClass({
  render() {
    return (
      <div className='row'>
        {this.props.children}
      </div>
    );
  }

});

export default Row;
