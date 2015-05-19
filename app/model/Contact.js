import mongoose from 'mongoose';
import createdAndModifiedAt from '../lib/createdAndModifiedAt';
import stateList from '../validation/states';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    verificationData: Schema.Types.Mixed
  },
  // end address
  email: String,
  phone: String
});

contactSchema.virtual('verifiedAddress').set(function (address) {
  this.address.street = address.delivery_line_1;
  this.address.city = address.components.city_name;
  this.address.state = address.components.state_abbreviation;
  this.address.zip = address.components.zipcode;
  this.address.verificationData = address;
});

contactSchema.virtual('fullName').get(function () {
  `${this.name.first} ${this.name.last}`
});

contactSchema.virtual('fullName').set(function (name) {
  let names = name.split(' ');
  this.name.first = names[0];
  this.name.last = names[1];
});

contactSchema.plugin(createdAndModifiedAt);

export default mongoose.model('Contact', contactSchema);
