import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/crm');

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
  console.log('MongoDB connects!');
});

export default db;
