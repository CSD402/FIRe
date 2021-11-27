import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: Number,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: true,
    unique: true,
  },
  residence_area: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});
