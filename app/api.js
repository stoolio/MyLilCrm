import express from 'express';
let router = express.Router();

import db from './db';
import mongoose from 'mongoose';

router.get('/test', function(req, res) {
  let Contact = mongoose.model('Contact');

  Contact.findOne({'name.first': 'Rick'}, 'name.last', function(err, contact) {
    if(err) {
      res.send('Error: ' + err);
      return;
    }
    res.send('Contact find: ' + contact.name.last);
  })
})

router.get('/', (req, res) => {
  res.send('API Test...');
});

let api = router;

export default api;
