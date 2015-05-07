import request from 'superagent';

let server = 'http://localhost:3001/api';

export default {
  load(cb) {
    return request
      .get(server + '/stages')
      .on('error', (err) => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  leadStage: {
    sort(stages, cb) {
      return request
        .post(server + '/stages/sort')
        .send(stages)
        .on('error', (err) => {
          handle(err);
          cb(err);
        })
        .end(cb);
    },
    add(stage, cb) {
      return request
        .post(server + '/stages/new')
        .send(stage)
        .on('error', (err) => {
          handle(err);
          cb(err);
        })
        .end(cb);
    },
    remove(id, cb) {
      return request
        .del(server + '/stages/' + id)
        .on('error', (err) => {
          handle(err);
          cb(err);
        })
        .end(cb);
    },
    change(stage, cb) {
      return request
        .post(server + '/stages/' + stage._id)
        .send(stage)
        .on('error', (err) => {
          handle(err);
          cb(err);
        })
        .end(cb);
    }
  }
};
