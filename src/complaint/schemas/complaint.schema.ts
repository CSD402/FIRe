import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const ComplaintSchema = new mongoose.Schema({
  place_of_incident: {
    type: String,
    required: true,
  },
  nearest_station: {
    type: String,
    required: true,
  },
  date_time: {
    type: Date,
    default: Date.now,
  },
  incident_type: {
    type: String,
    required: true,
  },
  seen_subjects: {
    type: Boolean,
    required: true,
  },
  suspect_desc: {
    type: String,
  },
  filed_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: {
    type: String,
  },
});
