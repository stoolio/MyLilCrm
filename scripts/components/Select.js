import React, {PropTypes} from 'react';

const SelectPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  })),
  PropTypes.arrayOf(PropTypes.string)
]);

const Select = React.createClass({
  propTypes: {
    value: PropTypes.any,
    name: PropTypes.string,
    options: SelectPropType
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
        <option key={value} value={value}>{name}</option>
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

const aVar = 1;

export {SelectPropType, aVar};

export default Select;
