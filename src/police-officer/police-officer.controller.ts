import { Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, } from '@nestjs/common';
import { PoliceOfficerService } from './police-officer.service';
import { PoliceOfficerDto } from './police-officer.dto';

@Controller('police-officer')
export class PoliceOfficerController {
    constructor(private complaintService: PoliceOfficerService) {}

    @Get()
    public async getOfficer() {
      return this.complaintService.getOfficer();
    }
  
    @Post()
    public async postOfficer(@Body() officer: PoliceOfficerDto) {
      return this.complaintService.postOfficer(officer);
    }
  
    @Get(':id')
    public async getOfficerById(@Param('id') id: string) {
      return this.complaintService.getOfficerById(id);
    }
  
    @Delete(':id')
    public async deleteOfficerById(@Param('id') id: string) {
      return this.complaintService.deleteOfficerById(id);
    }
  
    @Put(':id')
    public async putOfficerById(@Param('id') id: string, @Query() query) {
      const propertyName = query.property_name;
      const propertyValue = query.property_value;
      return this.complaintService.putOfficerById(id, propertyName, propertyValue);
    }
}
