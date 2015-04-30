import Reflux from 'reflux';
import LeadActions from '../actions/Lead';
import Api from '../api/Lead';

const LeadStore = Reflux.createStore({
  listenables: [LeadActions],
  getInitialState() {
    this.lead = {};
    this.leads = [];
    return {
      leads: [],
      lead: {}
    };
  },
  onLoad() {
    Api.load((err, res) => {
      let leads = JSON.parse(res.text).leads;
      this.updateLeads(leads);
    });
  },
  onAdd(lead) {
    Api.create(lead, (err, res) => {
      let theLead = JSON.parse(res.text).lead;
      this.updateLeads([theLead].concat(this.leads));
    });
  },
  onShow(id) {
    Api.show(id, (err, res) => {
      let lead = JSON.parse(res.text).lead;
      this.updateLead(lead);
    });
  },
  updateLeads(leads) {
    this.leads = leads;
    this.trigger({
      leads: leads,
      lead: this.lead
    })
  },
  updateLead(lead) {
    this.lead = lead;
    this.trigger({
      leads: this.leads,
      lead: lead
    })
  }
});

export default LeadStore;
