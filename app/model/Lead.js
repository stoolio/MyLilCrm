import mongoose from 'mongoose';
import createdAndModifiedAt from '../lib/createdAndModifiedAt';
import {Enum} from '../lib/modelHelpers';
import noteSchema from './Note';
import diamondRequestSchema from './diamondRequestSchema';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let validMetalQualities = '14kt 18kt Platinum Other'.split(' ');
let validMetalColors = 'White Yellow Rose'.split(' ');

let leadSchema = new Schema({
  contact: { type: ObjectId, ref: 'Contact' },
  budget: {
    from: { type: Number, min: 0 },
    to: { type: Number, min: 0 }
  },
  comments: { type: String },
  diamond: diamondRequestSchema,
  setting: {
    images: [String],
    style: String,
    metal: {
      quality: Enum(validMetalQualities),
      color: Enum(validMetalColors)
    }
  },
  notes: [noteSchema]
});

leadSchema.plugin(createdAndModifiedAt);

let Lead = mongoose.model('Lead', leadSchema);

export default Lead;
