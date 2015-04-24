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
      .get(server + '/api/contacts')
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  create(contact, cb) {
    let {fullName, email, phone} = contact;
    return request
      .post(server + '/api/contacts/new')
      .send({
        fullName,
        email,
        phone
      })
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  delete(id, cb) {
    request
      .del(server + '/api/contacts/' + id)
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  }
}
