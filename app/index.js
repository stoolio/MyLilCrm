import express from 'express';
import api from './api';
import routes from './routes';

let app = express();

app.use(express.static(__dirname + '/../public'));

app.get('/test', (req, res) => {
  res.send('This is a test of the emergency broadcast system...');
})

app.use('/fun', routes);

app.use('/api', api);

app.listen(3001);

console.log('express listening on port 3001');
