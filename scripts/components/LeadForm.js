import React from 'react';

import Field from './Field';
import Submit from './Submit';
import Select from './Select';
import Textarea from './Textarea';

const LeadForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    options: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string,
        value: React.PropTypes.string
      })),
      React.PropTypes.arrayOf(React.PropTypes.string)
    ])
  },
  getInitialState() {
    return {
      contact: '',
      budget: { 
        from: 0,
        to: 0
      },
      comments: ''
      // diamond: diamondRequestSchema,
      // setting: {
      //   images: [String],
      //   style: String,
      //   metal: {
      //     quality: Enum(validMetalQualities),
      //     color: Enum(validMetalColors)
      //   }
      // }
    };
  },
  onClick(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  },
  setFieldState(field, val) {
    let newState = {}
    if(field.indexOf('.') === -1) {
      newState[field] = val;
    } else {
      let keys = field.split('.'),
          len = keys.length - 1,
          cursor,
          i = -1;
      cursor = newState;
      while(++i < len) {
        cursor[keys[i]] = this.state[keys[i]];
        cursor = cursor[keys[i]];
      }
      cursor[keys[i]] = val;
    }
    this.setState(newState);
  },
  handleChange(field) {
    return (value) => {
      this.setFieldState(field, value);
    };
  },
  render() {
    return (
      <div className='row'>
        <div className='col-lg-6'>
          <form className='form-horizontal'>
            <Select value={this.state.contact} publishChange={this.handleChange('contact')} name='Contact' options={this.props.options} />
            <div className='form-group'>
              <Field value={this.state.budget.from} publishChange={this.handleChange('budget.from')} name='Budget From' type='number' placeholder='From' />
              <Field value={this.state.budget.to} publishChange={this.handleChange('budget.to')} name='Budget To' type='number' placeholder='To' />
            </div>
            <Textarea value={this.state.comments} publishChange={this.handleChange('comments')} name='Comments' placeholder='Enter additional information' />
            <Submit onClick={this.onClick} />
          </form>
        </div>
      </div>
    );
  }
});

export default LeadForm;
