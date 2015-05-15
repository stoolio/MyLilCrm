import Reflux from 'reflux';

import alphaSort from '../lib/alphaSort';
import findIndexById from '../lib/findIndexById';

import Api from '../api/ContactApi';
import ContactActions from '../actions/ContactActions';

let sortDir = 1;
let prevSort = false;

let loading = false,
    loaded = false;

const ContactStore = Reflux.createStore({
  listenables: [ContactActions],
  init() {
    // this.listenTo(ContactActions.load, this.loadContacts);
  },
  getInitialState() {
    this.contacts = [];
    return this.contacts;
  },
  onLoad() {
    loading = true;
    Api.load((err, res) => {
      this.contacts = JSON.parse(res.text).contacts;
      loaded = true;
      loading = false;
      this.trigger(this.contacts);
    });
  },
  onAdd(contact) {
    Api.create(contact, (err, res) => {
      let theContact = JSON.parse(res.text).contact;
      this.update([theContact].concat(this.contacts));
    });
  },
  onRemove(id) {
    // This?
    this.contacts.splice(findIndexById(this.contacts, id), 1);
    this.update(this.contacts);

    Api.delete(id);
    // Or?
    // Api.delete(id, (err, res) => {
    //   this.contacts.splice(findIndexById(this.contacts, id), 1);
    //   this.update(this.contacts);
    // });
  },
  onSort(by) {
    if(prevSort && prevSort === by) {
      sortDir = sortDir * -1;
    } else {
      sortDir = 1;
    }
    this.contacts.sort(alphaSort(by, sortDir));
    prevSort = by;
    this.trigger(this.contacts);
  },
  onSearch(str) {
    if(str.length === 0) this.filter(this.contacts);
    if (!loaded) {
      if (loading) return;
      ContactActions.load();
    } else {
      let regex = new RegExp(str, 'i');
      this.filter(this.contacts.filter(
        ({name: {first, last}, email}) => {
          let searchStr = `${first} ${last} ${email}`;
          if (searchStr.search(regex) === -1)
            return false;
          else
            return true;
        }
      ));
    }
  },
  update(contacts) {
    this.contacts = contacts;
    this.trigger(contacts);
  },
  filter(contacts) {
    this.trigger(contacts);
  }
});

export default ContactStore;
