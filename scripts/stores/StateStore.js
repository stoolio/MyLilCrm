import Reflux from 'reflux';
import AddressStore from './AddressStore';
import ContactStore from './ContactStore';
import FormStore from './FormStore';
import LeadStore from './LeadStore';
import UserStore from './UserStore';
import MessageStore from './MessageStore';
import SettingsStore from './SettingsStore';

const StateStore = Reflux.createStore({
  init() {
    AddressStore.listen(this.onAddressChange);
    ContactStore.listen(this.onContactChange);
    FormStore.listen(this.onFormChange);
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
      leadStages: [],
      suggestions: [],
      forms: {}
    };
    return this.state;
  },
  onAddressChange({suggestions, verifiedAddress}) {
    this.state.suggestions = suggestions;
    this.trigger(this.state);
  },
  onContactChange(contacts) {
    this.state.contacts = contacts;
    this.trigger(this.state);
  },
  onFormChange(formData) {
    this.state.forms = formData;
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
