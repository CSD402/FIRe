const mongoose = require('mongoose');
const { MUUID } = require('mongooseodm-uuid');

export interface Complaint {
  uid: String;
  place_of_incident: string;
  nearest_station: String;
  date_time?: Date;
  incident_type: string;
  seen_subjects: boolean;
  suspect_desc?: string;
  comments?: string;
  status: string;
  date_time_of_incident: string;
  officer_name: String;
  filed_by_name: String;
  officer_phone: Number;
}
