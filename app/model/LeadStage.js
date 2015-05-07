import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let leadStageSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String, trim: true }
});

let LeadStage = mongoose.model('LeadStage', leadStageSchema);

export default LeadStage;
