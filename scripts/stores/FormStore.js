import Reflux from 'reflux';

import FormActions from '../actions/FormActions';

const FormStore = Reflux.createStore({
  listenables: [FormActions],
  getInitialState() {
    this.state = {};
    return this.state;
  },
  onChange(group, field, val) {
    this.state || (this.state = {});
    this.state[group] || (this.state[group] = {});
    this.state[group][field] = val;
    this.trigger(this.state);
  },
  onSetGroup(group, vals) {
    this.state[group] = vals;
    this.trigger(this.state);
  },
  onSubmit(group, fn) {
    fn(this.state[group]);
  }
});

export default FormStore;
