import * as mongoose from 'mongoose';

export const PoliceOfficerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: Number,
    unique: true,
    required: true,
  },
  phone_number: {
    type: Number,
    unique: true,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  appointed_station: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
