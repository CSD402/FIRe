import { Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import { ComplaintDto } from './complaint.dto';

@Controller('complaint')
export class ComplaintController {
    constructor(private complaintService: ComplaintService) {}

  @Get()
  public async getComplaint() {
    return this.complaintService.getComplaint();
  }

  @Post()
  public async postComplaint(@Body() complaint: ComplaintDto) {
    return this.complaintService.postComplaint(complaint);
  }

  @Get(':id')
  public async getComplaintById(@Param('id') id: string) {
    return this.complaintService.getComplaintById(id);
  }

  @Delete(':id')
  public async deleteComplaintById(@Param('id') id: string) {
    return this.complaintService.deleteComplaintById(id);
  }

  @Put(':id')
  public async putComplaintById(@Param('id') id: string, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.complaintService.putComplaintById(id, propertyName, propertyValue);
  }
}