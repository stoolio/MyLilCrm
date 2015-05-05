import express from 'express';
import {json} from 'body-parser';

// DB Schema
import './model/Contact';
import './model/Lead';
import './model/User';

// API Routes
import contacts from './api/contacts';
import leads from './api/leads';
import users from './api/users';

// Connect to DB
import db from './db';

// Configure express
let allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

let app = express();
app.use(json());

app.get('/test', (req, res) => {
  res.send('This is a test of the emergency broadcast system...');
});

// Configure api
let api = express();
api.use(allowCrossDomain);

// contacts
api.param('id', contacts.load);
api.get('/contacts', contacts.index);
api.post('/contacts/new', contacts.create);
api.get('/contacts/:id', contacts.show);
// api.get('/contacts/:id/lead', contacts.lead);
api.post('/contacts/:id', contacts.update);
api.delete('/contacts/:id', contacts.destroy);

// leads
api.param('leadId', leads.load);
api.get('/leads', leads.index);
api.post('/leads/new', leads.create);
api.post('/leads/:leadId/notes/new', leads.createNote);
api.get('/leads/:leadId', leads.show);
api.post('/leads/:leadId', leads.update);
api.delete('/leads/:leadId', leads.destroy);

// users
api.param('userId', users.load);
api.post('/users/new', users.create);
api.post('/users/login', users.login);

app.use('/api', api);

app.listen(3001);

console.log('express listening on port 3001');
