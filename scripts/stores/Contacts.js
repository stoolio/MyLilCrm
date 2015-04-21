import Reflux from 'refluxjs';
import ContactActions from '../actions/Contacts';

import request from 'superagent';

let server = 'http://localhost:3001';

let ContactStore = Reflux.createStore({
  listenables: [ContactActions],
  function onAddItem() {
    request
      .post(server + '/api/contacts/new')
      .set('Content-Type', 'application/json')
  },
  function onRemoveItem() {

  },
  function getInitialState() {
    request
      .get(server + '/api/contacts')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if(res.ok) {
          this.contacts = res.body;
        } else {
          alert('Error: ' + res.test);
        }
      })
  }
});

export default ContactStore;
