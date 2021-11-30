import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

export const ComplaintSchema = new mongoose.Schema({
  _id: {
    type: String,
    length: 6,
    default: function genUUID() {
      return uuid.v1().slice(0, 6);
    },
    unique: true,
    immutable: true,
  },
  place_of_incident: {
    type: String,
    required: true,
    immutable: true,
  },
  nearest_station: {
    type: String,
    required: true,
    immutable: true,
  },
  date_time: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  incident_type: {
    type: String,
    required: true,
    immutable: true,
  },
  seen_subjects: {
    type: Boolean,
    required: true,
    immutable: true,
  },
  suspect_desc: {
    type: String,
    immutable: true,
  },
  filed_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    immutable: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending for apporoval',
  },
  comments: {
    type: String,
    immutable: true,
  },
});
