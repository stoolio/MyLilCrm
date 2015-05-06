import React from 'react';

const Select = React.createClass({
  propTypes: {
    value: React.PropTypes.any,
    name: React.PropTypes.string,
    options: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        value: React.PropTypes.string
      })),
      React.PropTypes.arrayOf(React.PropTypes.string)
    ])
  },
  onChange(e) {
    this.props.publishChange(e.target.value);
  },
  parseOptions() {
    if(!(this.props.options[0] instanceof Object)) {
      return this.props.options.map(str => {
        return {
          name: str,
          value: str
        };
      });
    } else {
      return this.props.options;
    }
  },
  render() {
    let options = this.parseOptions().map(function(opt) {
      let {name, value} = opt;
      return (
        <option value={value}>{name}</option>
      );
    })

    return (
      <select className='form-control'
              value={this.props.value}
              name={this.props.name}
              onChange={this.onChange}>
        {options}
      </select>
    );
  }

});

export default Select;
