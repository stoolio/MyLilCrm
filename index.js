import express from 'express';

let app = express();

app.use(express.static('public'));

app.get('/test', (req, res) => {
  res.send('This is a test of the emergency broadcast system...');
})

app.listen(3001);

console.log('express listening on port 3001');
