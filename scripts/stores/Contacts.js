import Reflux from 'reflux';
import ContactActions from '../actions/Contacts';
import Api from '../api/Contacts';

let alphaSort = function(by, dir) {
  return (a, b) => {
    if(by.indexOf('.') !== -1) {
      a = a['name'];
      b = b['name'];
      by = by.substr(by.indexOf('.') + 1);
    }
    a = a[by];
    b = b[by];
    if(a < b) return -1 * dir;
    if(a > b) return 1 * dir;
    return 0;
  };
};

let prevSort = false;

let ContactStore = Reflux.createStore({
  listenables: [ContactActions],
  init() {
    this.listenTo(ContactActions.load, this.loadContacts);
  },
  getInitialState() {
    this.contacts = [];
    return this.contacts;
  },
  loadContacts() {
    Api.load((err, res) => {
      this.contacts = JSON.parse(res.text).contacts;
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
    // Better?
    this.contacts.splice(this.getIndexById(id), 1);
    this.update(this.contacts);

    Api.delete(id);
    // Or?
    // Api.delete(id, (err, res) => {
    //   this.contacts.splice(this.getIndexById(id), 1);
    //   this.update(this.contacts);
    // });
  },
  onSort(by) {
    let dir = 1;
    if(prevSort && prevSort === by) {
      dir = -1;
    }
    this.contacts.sort(alphaSort(by, dir));
    this.trigger(this.contacts);
  },
  getIndexById(id) {
    let i = -1, len = this.contacts.length;
    while(++i < len) {
      if(this.contacts[i]._id === id) {
        return i;
      }
    }
    return false;
  },
  update(contacts) {
    this.contacts = contacts;
    this.trigger(contacts);
  }
});

export default ContactStore;
