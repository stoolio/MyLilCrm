import React from 'react';

import {column} from './layout/bootstrapHelpers';

import Column from './layout/Column';

const Textarea = React.createClass({
  propTypes: {
    value: React.PropTypes.any.isRequired,
    name: React.PropTypes.string,
    placeholder: React.PropTypes.string
  },
  handleChange(e) {
    e.preventDefault()
    let {target: {value}} = e;
    this.props.value(value);
  },
  render() {
    let tag = 'input' + this.props.name;
    return (
      <div className='form-group'>
        <label htmlFor={tag} className={`${column({small: 3})} control-label`}>
          {this.props.name}
        </label>
        <Column cols={{small: 9}}>
          <textarea  value={this.props.value()}
                  onChange={this.handleChange}
                  type={this.props.type}
                  placeholder={this.props.placeholder}
                  id={tag}
                  className='form-control'
                  rows='3' />
        </Column>
      </div>
    );
  }

});

export default Textarea;
