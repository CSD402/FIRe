import { Injectable } from '@nestjs/common';
import { ComplaintDto } from './complaint.dto';

@Injectable()
export class ComplaintService {
    public async getComplaint() {}
    public async postComplaint(newComplaintr: ComplaintDto) {}
    public async getComplaintById(id: string) {}
    public async deleteComplaintById(id: string) {}
    public async putComplaintById(id: string,
        propertyName: string,
        propertyValue: string) {}
}
