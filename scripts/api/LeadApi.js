import request from 'superagent';
import handle from './handleError';

let server = 'http://localhost:3001';

export default {
  load(cb) {
    return request
      .get(server + '/api/leads')
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  create(lead, cb) {
    return request
      .post(server + '/api/leads/new')
      .send(lead)
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  show(id, cb) {
    request
      .get(server + '/api/leads/' + id)
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  createNote(id, note, cb) {
    request
      .post(server + '/api/leads/' + id + '/notes/new')
      .send(note)
      .on('error', err => {
        handle(err);
        cb(err);
      })
      .end(cb);
  }
}
