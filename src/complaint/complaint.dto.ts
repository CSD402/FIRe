export class ComplaintDto {
    readonly id: string;
    readonly place_of_incident: string;
    readonly nearest_station: number;
    readonly date_time: Date;
    readonly incident_type: string;
    readonly seen_subjects: boolean;
    readonly suspect_desc: string;
    readonly comments: string;
  }
  