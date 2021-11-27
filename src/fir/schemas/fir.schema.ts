import * as mongoose from 'mongoose';

export const FirSchema = new mongoose.Schema({
  complaint_id: {
    type: String,
    required: true,
    unique: true,
  },
  approved_by: {
    type: String,
    required: true,
    unique: true,
  },
  comments: {
    type: String,
  },
});
