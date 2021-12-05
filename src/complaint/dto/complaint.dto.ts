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
  readonly date_time_of_incident: string;
  readonly officer_name: String;
  readonly filed_by_name: String;
  readonly fir_id: String;
  readonly officer_phone: Number;
}
