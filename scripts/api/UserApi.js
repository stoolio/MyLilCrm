import request from 'superagent';
import handle from './handleError';

let server = 'http://localhost:3001';

export default {
  load(cb) {
    return request
      .get(server + '/api/users')
      .on('error', err => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  create(user, cb) {
    return request
      .post(server + '/api/users/new')
      .send(user)
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  login(user, cb) {
    return request
      .post(server + '/api/users/login')
      .send(user)
      .on('error', err => {
        handle(err);
        cb(err);
      })
      .end(cb);
  }
};
