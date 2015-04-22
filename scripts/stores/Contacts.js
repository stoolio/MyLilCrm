import Reflux from 'refluxjs';
import ContactActions from '../actions/Contacts';

import request from 'superagent';

let server = 'http://localhost:3001';

let ContactStore = Reflux.createStore({
  listenables: [ContactActions],
  onAddItem() {
    request
      .post(server + '/api/contacts/new')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        if(!res.ok) {
          console.log('Error: ', res.text);
        }
      });
  },
  onRemoveItem() {
    request
      .del(server + '/api/contacts/:id')
      .end((err, res) => {
        if(!res.ok) {
          console.log('Error: ', res.text);
        }
      });
  },
  getInitialState() {
    request
      .get(server + '/api/contacts')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(res.ok) {
          this.contacts = res.body;
        } else {
          console.log('Error: ', res.text);
        }
      });
  }
});

export default ContactStore;
