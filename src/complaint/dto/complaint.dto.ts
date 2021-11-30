export class ComplaintDto {
  readonly uid: String;
  readonly place_of_incident: string;
  readonly nearest_station: String;
  readonly date_time: Date;
  readonly incident_type: string;
  readonly seen_subjects: boolean;
  readonly suspect_desc: string;
  readonly comments: string;
  readonly status: string;
}
