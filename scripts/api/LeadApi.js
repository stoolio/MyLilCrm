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
