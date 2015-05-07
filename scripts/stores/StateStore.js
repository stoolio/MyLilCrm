import Reflux from 'reflux';
import ContactStore from './ContactStore';
import LeadStore from './LeadStore';
import UserStore from './UserStore';
import MessageStore from './MessageStore';
import SettingsStore from './SettingsStore';

let StateStore = Reflux.createStore({
  init() {
    ContactStore.listen(this.onContactChange);
    LeadStore.listen(this.onLeadChange);
    UserStore.listen(this.onUserChange);
    MessageStore.listen(this.onMessageChange);
    SettingsStore.listen(this.onSettingsChange);
  },
  getInitialState() {
    this.state = {
      leads: [],
      lead: {},
      contacts: [],
      users: {},
      currentUser: false,
      messages: [],
      leadStages: []
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
  onUserChange(userInfo) {
    this.state.currentUser = userInfo.currentUser;
    this.state.users = userInfo.users;
    this.trigger(this.state);
  },
  onMessageChange(messages) {
    this.state.messages = messages;
    this.trigger(this.state);
  },
  onSettingsChange(settings) {
    this.state.leadStages = settings.leadStages;
    this.trigger(this.state);
  }
});

export default StateStore;
