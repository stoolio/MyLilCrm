import React, {PropTypes} from 'react';
import isUndefined from 'lodash/lang/isUndefined';
import snakeCase from 'lodash/string/snakeCase';

const Field = React.createClass({
  propTypes: {
    value: PropTypes.func.isRequired,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    displayFn: PropTypes.func
  },
  getDefaultProps() {
    return {
      name: '',
      placeholder: '',
      display: {
        from: x => x,
        to: x => x
      }
    };
  },
  handleChange(e) {
    e.preventDefault()
    this.props.value(this.props.display.from(e.target.value));
  },
  render() {
    const {
      value,
      name,
      type,
      placeholder,
      display
    } = this.props;

    let displayLabel = !isUndefined(name);
    let tag = displayLabel ? `input_${snakeCase(this.props.name)}` : '',
        label = displayLabel ? (
          <label htmlFor={tag} className='col-sm-3 control-label'>
            {this.props.name}
          </label>
        ) :
        null;

    return (
      <div className='form-group'>
        {label}
        <div className={displayLabel ? 'col-sm-9' : ''}>
          <input
            value={display.to(value())}
            onChange={this.handleChange}
            type={type}
            placeholder={placeholder}
            id={tag}
            className='form-control' />
        </div>
      </div>
    );
  }
});

export default Field;
