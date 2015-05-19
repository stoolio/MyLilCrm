import mongoose from 'mongoose';
import createdAndModifiedAt from '../lib/createdAndModifiedAt';
import {Enum} from '../lib/modelHelpers';
import noteSchema from './noteSchema';
import {metals, metalColors} from '../validation/rings';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let leadSchema = new Schema({
  contact: { type: ObjectId, ref: 'Contact' },
  stage: { type: ObjectId, ref: 'LeadStage' },
  budget: {
    from: { type: Number, min: 0 },
    to: { type: Number, min: 0 }
  },
  comments: { type: String },
  diamond: { type: ObjectId, ref: 'DiamondRequest'},
  setting: {
    images: [String],
    style: String,
    metal: {
      quality: Enum(metals),
      color: Enum(metalColors)
    }
  },
  notes: [noteSchema]
});

leadSchema.plugin(createdAndModifiedAt);

leadSchema.virtual('budgetFrom').set(function (val) {
  this.budget.from = val;
});

leadSchema.virtual('budgetTo').set(function (val) {
  this.budget.to = val;
});

let Lead = mongoose.model('Lead', leadSchema);

export default Lead;
