import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ComplaintService } from '../service/complaint.service';
import { ComplaintDto } from '../dto/complaint.dto';
import { Complaint } from '../interfaces/complaint.interface';

@Controller('complaint')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @Get()
  public async getComplaint(): Promise<Complaint[]> {
    return this.complaintService.getComplaint();
  }

  @Post()
  public async postComplaint(
    @Body() complaint: ComplaintDto,
  ): Promise<Complaint> {
    return this.complaintService.postComplaint(complaint);
  }

  @Get(':id')
  public async getComplaintById(@Param('id') id): Promise<Complaint> {
    return this.complaintService.getComplaintById(id);
  }

  @Delete(':id')
  public async deleteComplaintById(@Param('id') id): Promise<Complaint> {
    return this.complaintService.deleteComplaintById(id);
  }

  @Put('/review/:id')
  public async putComplaintById_review(
    // @Body() updateCompaintDto: ComplaintDto,
    @Param('id') id,
  ): Promise<JSON> {
    return this.complaintService.putComplaintById_review(id);
  }

  @Put('/submit/:id')
  public async putComplaintById_submit(
    // @Body() updateCompaintDto: ComplaintDto,
    @Param('id') id,
  ): Promise<JSON> {
    return this.complaintService.putComplaintById_submit(id);
  }
}
