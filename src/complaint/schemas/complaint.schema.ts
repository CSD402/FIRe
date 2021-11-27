import * as mongoose from 'mongoose';

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
  comments: {
    type: String,
  },
});
