import mongoose from 'mongoose';

import {modifiedAt} from '../lib/modifiedAt';
import states from '../validation/states';

const Schema = mongoose.Schema;

const addressSchema = new Schema({
  street: { type: String, trim: true },
  street2: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, enum: states, default: 'Unknown' },
  zip: { type: String, trim: true },
  verificationData: Schema.Types.Mixed
});

export default mongoose.model('Address', addressSchema);
