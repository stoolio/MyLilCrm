import request from 'superagent';
import handle from './handleError';

const url = {
  autocomplete: 'https://autocomplete-api.smartystreets.com/suggest',
  verify: 'https://api.smartystreets.com/street-address'
};

const auth = {
  'auth-id': '' /* enter actual auth id here */
};

export default {
  autocomplete(prefix, cb) {
    return request
      .get(url.autocomplete)
      .query(auth)
      .query({
        prefix,
        prefer: 'Chicago,IL;IL;AZ'
      })
      .on('error', err => {
        handle(err);
        cb(err);
      })
      .end(cb);
  },
  verify(address, cb) {
    return request
      .get(url.verify)
      .query(auth)
      .query({
        street: address,
        cadidates: 3
      })
      .on('error', err => {
        handle(err);
        cb(err);
      })
      .end(cb);
  }
};
