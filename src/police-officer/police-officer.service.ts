import { Injectable } from '@nestjs/common';
import { PoliceOfficerDto } from './police-officer.dto';

@Injectable()
export class PoliceOfficerService {
    public async getOfficer() {}
    public async postOfficer(newOfficer: PoliceOfficerDto) {}
    public async getOfficerById(id: string) {}
    public async deleteOfficerById(id: string) {}
    public async putOfficerById(id: string,
        propertyName: string,
        propertyValue: string) {}
}
