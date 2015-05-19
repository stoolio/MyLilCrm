import React from 'react';

import Column from './layout/Column';

import Field from './Field';
import Submit from './Submit';
import Select, {SelectPropType} from './Select';
import Textarea from './Textarea';

const LeadForm = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired,
    options: SelectPropType.isRequired,
    stages: SelectPropType.isRequired
  },
  // setFieldState(field, val) {
  //   let newState = {}
  //   if(field.indexOf('.') === -1) {
  //     newState[field] = val;
  //   } else {
  //     let keys = field.split('.'),
  //         len = keys.length - 1,
  //         cursor,
  //         i = -1;
  //     cursor = newState;
  //     while(++i < len) {
  //       cursor[keys[i]] = this.state[keys[i]];
  //       cursor = cursor[keys[i]];
  //     }
  //     cursor[keys[i]] = val;
  //   }
  //   this.setState(newState);
  // },
  // handleChange(field) {
  //   return (value) => {
  //     this.setFieldState(field, value);
  //   };
  // },
  render() {
    const {
      contact,
      stage,
      budgetFrom,
      budgetTo,
      comments
    } = this.props.fields;
    return (
      <form className='form-horizontal'>
        <div className='form-group'>
          <Column cols={{medium: 3}} offset={{medium: 3}}>
            <Select value={contact}
                    name='Contact'
                    options={this.props.options} />
          </Column>
          <Column cols={{medium: 4}} offset={{medium: 1}}>
            <Select value={stage}
                    name='Stage'
                    options={this.props.stages} />
          </Column>
        </div>
        <Field  value={budgetFrom}
                name='Budget From'
                type='number'
                placeholder='From' />
        <Field  value={budgetTo}
                name='Budget To'
                type='number'
                placeholder='To' />
        <Textarea value={comments}
                  name='Comments'
                  placeholder='Enter additional information' />
        <Submit onClick={this.props.onSubmit} />
      </form>
    );
  }
});

export default LeadForm;
