import FormActions from './FormActions';

import pick from 'lodash/object/pick';
import partial from '../lib/partial';

const FormMixin = {
  Group(group, fields) {
    let ret = fields.reduce((acc, field) => {
      acc[field] = function (val) {
        if (val === undefined) {
          if (this.props.forms[group] === undefined) {
            return '';
          }
          if (this.props.forms[group][field] === undefined) {
            return '';
          }
          return this.props.forms[group][field];
        }
        FormActions.change(group, field, val);
      };
      return acc;
    }, {});

    // ret.clear = function () {
    //   const len = fields.length;
    //   let i = -1;
    //   while (++i < len) {
    //     this.props.forms[group][fields[i]] = '';
    //   }
    // };

    ret.submit = function (fn, extra = {}) {
      FormActions.submit(group, fn, extra);
    };

    ret.fields = function () {
      return pick(this, ...fields);
    };

    return ret;
  },
  Field(group, field) {
    return {
      value(val) {
        if (val === undefined) {
          if (this.props.forms[group] === undefined)
            return '';
          return this.props.forms[group][field];
        }
        FormActions.change(group, field, val);
      },
      submit(fn) {
        fn(this.value());
      }
    };
  }
}

export default FormMixin;
