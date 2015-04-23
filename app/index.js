import express from 'express';
import {json} from 'body-parser';

// DB Schema
import './db/Contact';

// API Routes
import contacts from './api/contacts';

import db from './db';

let allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}

let app = express();
app.use(allowCrossDomain);
app.use(json());


app.get('/test', (req, res) => {
  res.send('This is a test of the emergency broadcast system...');
})

let api = express();

api.param('id', contacts.load);
api.get('/contacts', contacts.index);
api.post('/contacts/new', contacts.create);
api.post('/contacts/:id', contacts.update);
api.delete('/contacts/:id', contacts.destroy);

app.use('/api', api);

app.listen(3001);

console.log('express listening on port 3001');
