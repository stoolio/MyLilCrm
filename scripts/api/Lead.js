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
      .get(server + '/api/leads')
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  create(lead, cb) {
    console.log('Api.create: ', lead);
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
  }
}
