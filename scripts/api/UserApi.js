import request from 'superagent';

let server = 'http://localhost:3001';

let handle = (err) => {
  console.log('--Error--');
  if(err.status) {
    console.log('Status: ', err.status);
    console.log(err.response);
  } else {
    console.log(err);
  }
  console.log('---------');
};

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
