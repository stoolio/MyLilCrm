import mongoose from 'mongoose';

let contactSchema = mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  email: String,
  phone: String
});

contactSchema.virtual('fullName').get(function() {
  return this.name.first + ' ' + this.name.last;
});

contactSchema.virtual('fullName').set(function(name) {
  let names = name.split(' ');
  this.name.first = names[0];
  this.name.last = names[1];
});

let Contact = mongoose.model('Contact', contactSchema);
