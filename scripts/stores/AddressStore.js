import Reflux from 'reflux';

import AddressActions from '../actions/AddressActions';
import Api from '../api/AddressApi';

import MessageActions from '../actions/MessageActions';

const AddressStore = Reflux.createStore({
  listenables: [AddressActions],
  getInitialState() {
    return {
      suggestions: []
    }
  },
  onAutocomplete(str) {
    if (str.length === 0) {
      this.suggest([]);
      return;
    }
    Api.autocomplete(str, (err, res) => {
      if (err) {
        console.log(err);
        this.suggest(['Error: no suggestions']);
      }
      const suggestions = JSON.parse(res.text).suggestions || [{text: 'No suggestions'}];
      this.suggest(suggestions.map(({text}) => text));
    });
  },
  onVerify(addr, setter) {
    Api.verify(addr, (err, res) => {
      if (err) {
        console.log(err);
        // this.verify('Error: unable to verify address')
      }
      const [verified, ...others] = JSON.parse(res.text);
      if (others.length !== 0) {
        MessageActions.add({
          callout: 'Warning: ',
          message: 'Unable to verify address',
          type: 'warning'
        });
      }
      if (setter && typeof setter === 'function')
        setter(verified);
      this.suggest([]);
    })
  },
  onClear() {
    this.trigger({
      suggestions: []
    });
  },
  suggest(data) {
    this.trigger({
      suggestions: data
    });
  }
  // verify(data) {
  //   this.trigger({
  //     suggestions: []
  //   });
  // }
});

export default AddressStore;
