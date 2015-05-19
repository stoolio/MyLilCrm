import Reflux from 'reflux';

import pluck from 'ramda/src/pluck';
import findIndexById from '../lib/findIndexById';

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
    let stages = this.state.leadStages;
    switch (action.substr(0, 2)) {
      case '$a': // add
        Api.leadStage.add(data, (err, res) => {
          let stage = JSON.parse(res.text).stage;
          stages = stages.concat(stage);
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
            let i = findIndexById(stages, data);
            stages.splice(i, 1);
            this.trigger(this.state);
          }
        });
        break;
      case '$c': // change
        Api.leadStage.change(data, (err, res) => {
          let stage = JSON.parse(res.text).stage,
              i = findIndexById(stages, stage._id);
          stages[i] = stage;
          this.trigger(this.state);
        });
        break;
      case '$s': // sort
        let {from, to, commit} = data,
            from = findIndexById(stages, from),
            to = findIndexById(stages, to);
        stages.splice(to, 0, stages.splice(from, 1)[0]);
        if (!!commit) {
          Api.leadStage.sort(
            pluck('_id', stages),
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
