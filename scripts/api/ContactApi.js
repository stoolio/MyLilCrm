import request from 'superagent';
import handle from './handleError';

let server = 'http://localhost:3001';

export default {
  load(cb) {
    return request
      .get(server + '/api/contacts')
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  create(contact, cb) {
    return request
      .post(server + '/api/contacts/new')
      .send(contact)
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  delete(id, cb) {
    return request
      .del(server + '/api/contacts/' + id)
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  }
}
