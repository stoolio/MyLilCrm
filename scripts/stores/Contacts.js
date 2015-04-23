import Reflux from 'reflux';
import ContactActions from '../actions/Contacts';

import request from 'superagent';

let server = 'http://localhost:3001';

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
    request
      .get(server + '/api/contacts')
      .end((err, res) => {
        this.contacts = JSON.parse(res.text).contacts;
        this.trigger(this.contacts);
      });
  },
  onAdd(contact) {
    let {fullName, email, phone} = contact;
    request
      .post(server + '/api/contacts/new')
      .send({
        fullName,
        email,
        phone
      })
      .end((err, res) => {
        if(!res.ok) {
          console.log('Error: ', res.text);
        } else {
          let theContact = JSON.parse(res.text).contact;
          this.update([theContact].concat(this.contacts));
        }
      });
  },
  onRemove(id) {
    request
      .del(server + '/api/contacts/' + id)
      .end((err, res) => {
        if(!res.ok) {
          console.log('Error: ', res.text);
        } else {
          this.contacts.splice(this.getIndexById(id), 1);
          this.update(this.contacts);
        }
      });
  },
  onSort(by, dir) {
    this.contacts.sort((a, b) => {
      if(by.indexOf('.') !== -1) {
        a = a['name'], b = b['name'];
        by = by.substr(by.indexOf('.') + 1)
      }
      a = a[by], b = b[by];
      if(a < b) return -1 * dir;
      if(a > b) return 1 * dir;
      return 0
    })
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
