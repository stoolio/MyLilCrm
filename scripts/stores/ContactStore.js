import Reflux from 'reflux';
import ContactActions from '../actions/ContactActions';
import Api from '../api/ContactApi';

function get(obj, path) {
  if(path.indexOf('.') === -1) {
    return obj[path];
  } else {
    let keys = path.split('.'),
        len = keys.length - 1,
        cursor,
        i = -1;
    cursor = obj;
    while(++i < len) {
      cursor = cursor[keys[i]];
    }
    return cursor[keys[i]];
  }
}

let alphaSort = function(by, dir) {
  return (a, b) => {
    a = get(a, by);
    b = get(b, by);
    if(a < b) return -1 * dir;
    if(a > b) return 1 * dir;
    return 0;
  };
};

let sortDir = 1;
let prevSort = false;

let loading = false,
    loaded = false;

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
      this.filter(this.contacts.filter(contact => {
        let searchStr = `${contact.name.first} ${contact.name.last} ${contact.email}`;
        if (searchStr.search(regex) === -1)
          return false;
        else
          return true;
      }));
    }
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
  },
  filter(contacts) {
    this.trigger(contacts);
  }
});

export default ContactStore;
