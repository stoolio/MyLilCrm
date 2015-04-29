import Reflux from 'reflux';
import LeadActions from '../actions/Lead';
import Api from '../api/Lead';

const LeadStore = Reflux.createStore({
  listenables: [LeadActions],
  getInitialState() {
    return {
      leads: [],
      lead: {}
    };
  },
  onLoad() {
    Api.load((err, res) => {
      let leads = JSON.parse(res.text).leads;
      this.index(leads);
    });
  },
  onAdd(lead) {
    Api.create(lead, (err, res) => {
      let theLead = JSON.parse(res.text).lead;
      this.index([theLead].concat(this.leads));
    });
  },
  onShow(id) {
    Api.show(id, (err, res) => {
      let lead = JSON.parse(res.text).lead;
      this.show(lead);
    });
  },
  index(leads) {
    this.leads = leads;
    this.trigger(leads);
  },
  show(lead) {
    this.lead = lead;
    this.trigger(lead);
  }
});

export default LeadStore;
