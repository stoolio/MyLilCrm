import mongoose from 'mongoose';
import createdAndModifiedAt from '../lib/createdAndModifiedAt';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let noteSchema = new Schema({
  user: { type: ObjectId, ref: 'User' },
  subject: String,
  content: String
})

noteSchema.plugin(createdAndModifiedAt);

export default noteSchema;
