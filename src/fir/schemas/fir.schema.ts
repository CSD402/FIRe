import * as mongoose from 'mongoose';
var Schema = mongoose.Schema;

export const FirSchema = new mongoose.Schema({
  complaint_id: {
    type: Schema.Types.ObjectId,
    ref: 'Complaint',
    required: true,
    immutable: true,
  },
  approved_by: {
    type: Schema.Types.ObjectId,
    ref: 'PoliceOfficer',
    required: true,
    immutable: true,
  },
  comments: {
    type: String,
    immutable: true,
  },
});
