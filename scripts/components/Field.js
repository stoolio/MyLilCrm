import React from 'react';
import isUndefined from 'lodash/lang/isUndefined';
import snakeCase from 'lodash/string/snakeCase';

const Field = React.createClass({
  propTypes: {
    value: React.PropTypes.any.isRequired,
    name: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    publishChange: React.PropTypes.func.isRequired
  },
  handleChange(e) {
    e.preventDefault()
    this.props.publishChange(e.target.value);
  },
  render() {
    let displayLabel = !isUndefined(this.props.name);
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
          <input  value={this.props.value}
                  onChange={this.handleChange}
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  id={tag}
                  className='form-control' />
        </div>
      </div>
    );
  }
});

export default Field;
