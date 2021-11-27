export interface Complaint {
  id?: string;
  place_of_incident: string;
  nearest_station: String;
  date_time?: Date;
  incident_type: string;
  seen_subjects: boolean;
  suspect_desc?: string;
  comments?: string;
}
