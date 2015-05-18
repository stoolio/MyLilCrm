import Reflux from 'reflux';
import LeadActions from '../actions/LeadActions';
import Api from '../api/LeadApi';

// I would like to refactor this to only include this.leads
// in onShow, instead of setting a current object at this.lead
// it would expand the object in this.leads
// However, this is a bonus feature and not necessary
// So, it's on hold ...

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
      // this.idIndex = leads.reduce((acc, lead, i) => {
      //   acc[lead._id] = i;
      //   return acc;
      // }, {});
      this.updateLeads(leads);
    });
  },
  onAdd(lead) {
    Api.create(lead, (err, res) => {
      let theLead = JSON.parse(res.text).lead;
      this.updateLeads(this.leads.push(theLead));
    });
  },
  onAddNote(id, note) {
    // note.user = id;
    // this.leads[this.idIndex[id]].notes.shift(note);
    Api.createNote(id, note, (err, res) => {
      let lead = JSON.parse(res.text).lead;
      this.updateLead(lead);
    })
  },
  onShow(id) {
    Api.show(id, (err, res) => {
      let lead = JSON.parse(res.text).lead;
      // this.leads[this.idIndex[id]] = lead;
      this.updateLead(lead);
    });
  },
  onSort() {

  },
  onFilter(stage) {
    if (stage === '')
      this.filterLeads(this.leads);
    else
      this.filterLeads(this.leads.filter(lead => {
        if (!lead.stage) return false;
        return lead.stage.name === stage;
      }));
  },
  onSearch(str) {
    if(!str) this.filterLeads(this.leads);

    let regex = new RegExp(str, 'i');
    this.filterLeads(this.leads.filter(
      lead => {
        let searchStr = 'Unknown';
        if (lead.contact) {
          let {first, last, email} = lead.contact;
          if (first || last || email)
            searchStr = `${first} ${last} ${email}`;
        }
        if (searchStr.search(regex) === -1)
          return false;
        else
          return true;
      }
    ));
  },
  filterLeads(leads) {
    this.trigger({
      leads: leads,
      lead: this.lead
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
