import Reflux from 'reflux';

import pluck from 'lodash/collection/pluck';

import Api from '../api/SettingsApi';
import SettingsActions from '../actions/SettingsActions';
import MessageActions from '../actions/MessageActions';

const SettingsStore = Reflux.createStore({
  listenables: [SettingsActions],
  init() {
    this.state = {
      leadStages: []
    };
  },
  getInitialState() {
    this.state = {
      leadStages: []
    };
    return this.state;
  },
  onLoad() {
    Api.load((err, res) => {
      let stages = JSON.parse(res.text).stages;
      this.state.leadStages = stages;
      this.trigger(this.state);
    });
  },
  onLeadStage(action, data) {

    switch (action.substr(0, 2)) {
      case '$a': // add
        Api.leadStage.add(data, (err, res) => {
          let stage = JSON.parse(res.text).stage;
          this.state.leadStages = this.state.leadStages.concat(stage);
          this.trigger(this.state);
        });
        break;
      case '$r': // remove
        Api.leadStage.remove(data, (err, res) => {
          let result = JSON.parse(res.text);
          if (result.success !== undefined) {
            MessageActions.add({
              message: result.success
            });
            let i = this.findById('leadStages', data);
            this.state.leadStages.splice(i, 1);
            this.trigger(this.state);
          }
        });
        break;
      case '$c': // change
        Api.leadStage.change(data, (err, res) => {
          let stage = JSON.parse(res.text).stage,
              i = this.findById('leadStages', stage._id);
          this.state.leadStages[i] = stage;
          this.trigger(this.state);
        });
        break;
      case '$s': // sort
        let {from, to, commit} = data,
            from = this.findById('leadStages', from),
            to = this.findById('leadStages', to);
        this.state.leadStages.splice(to, 0, this.state.leadStages.splice(from, 1)[0]);
        if (commit) {
          Api.leadStage.sort(
            pluck(this.state.leadStages, '_id'),
            (err, res) => {
              if (err) console.log(err);
            });
        }
        this.trigger(this.state);
        break;
    }
  },
  findById(path, id) {
    let i = -1,
        len = this.state[path].length;
    while(++i < len) {
      if(this.state[path][i]._id === id)
        return i;
    }
    return false;
  }
});

export default SettingsStore;
