import Reflux from 'reflux';
import ContactStore from './ContactStore';
import LeadStore from './LeadStore';
import UserStore from './UserStore';
import MessageStore from './MessageStore';

let StateStore = Reflux.createStore({
  init() {
    ContactStore.listen(this.onContactChange);
    LeadStore.listen(this.onLeadChange);
    UserStore.listen(this.onUserChange);
    MessageStore.listen(this.onMessageChange);
  },
  getInitialState() {
    this.state = {
      leads: [],
      lead: {},
      contacts: [],
      currentUser: false,
      messages: []
    };
    return this.state;
  },
  onContactChange(contacts) {
    this.state.contacts = contacts;
    this.trigger(this.state);
  },
  onLeadChange(leadData) {
    this.state.leads = leadData.leads || [];
    this.state.lead = leadData.lead || {};
    this.trigger(this.state);
  },
  onUserChange(user) {
    this.state.currentUser = user;
    this.trigger(this.state);
  },
  onMessageChange(messages) {
    this.state.messages = messages;
    this.trigger(this.state);
  }
});

export default StateStore;
