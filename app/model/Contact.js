import mongoose from 'mongoose';
import createdAndModifiedAt from '../lib/createdAndModifiedAt';
import stateList from '../validation/states';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: String,
  phone: String,
  state: { type: String, enum: stateList , default: 'Unknown' }
});

contactSchema.virtual('fullName').get(function() {
  return this.name.first + ' ' + this.name.last;
});

contactSchema.virtual('fullName').set(function(name) {
  let names = name.split(' ');
  this.name.first = names[0];
  this.name.last = names[1];
});

contactSchema.plugin(createdAndModifiedAt);

export default mongoose.model('Contact', contactSchema);
