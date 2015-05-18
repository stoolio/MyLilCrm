import React from 'react';

style = {
  borderWidth: 5,
  borderTopColor: '#3160ED',
  width: 50,
  height: 50,
  animation: '1s linear 0s normal none 1 running spin'
};

const Loader = function(component, loadFn) {
  return React.createClass({
    render() {
      return (
        if (!loadFn()) {
          return (
            <div style={style} />
          );
        }

        <component {this.props} />
      );
    }

  });
}

export default Loader;
