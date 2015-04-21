import express from 'express';

let app = express();

app.use(express.static(__dirname + '/../public'));

app.get('/test', (req, res) => {
  res.send('This is a test of the emergency broadcast system...');
})

app.listen(3000);

console.log('express listening on port 3000');
