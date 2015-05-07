import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let settingsSchema = new Schema({
  stages: [{ type: ObjectId, ref: 'LeadStage' }]
});

let Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
