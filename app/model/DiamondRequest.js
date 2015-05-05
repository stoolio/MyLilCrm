import mongoose from 'mongoose';
import {Enum, Range} from '../lib/modelHelpers';
import {color, clarity, shape, quality} from '../validation/diamonds';

let Schema = mongoose.Schema;

let diamondRequestSchema = new Schema({
  color: Range(color),
  clarity: Range(clarity),
  shape: Enum(shape),
  size: { type: Number, min: 0, },
  quality: Enum(quality)
});

export default mongoose.model('DiamondRequest', diamondRequestSchema);
