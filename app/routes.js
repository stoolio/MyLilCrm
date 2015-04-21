import express from 'express';
let routes = express.Router();

routes.get('/', function(req, res) {
  res.send('base route');
});

routes.get('/about', function(req, res) {
  res.send('About shit');
});

export default routes;
