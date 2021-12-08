import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ComplaintService } from '../service/complaint.service';
import { ComplaintDto } from '../dto/complaint.dto';
import { Complaint } from '../interfaces/complaint.interface';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('complaint')
export class ComplaintController {
  constructor(private complaintService: ComplaintService) {}

  @Get('/count')
  public async getComplaintCount(): Promise<Number> {
    return this.complaintService.getComplaintCount();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async postComplaint(
    @Body() complaint: ComplaintDto,
    @Req() request: Request,
  ): Promise<Complaint> {
    return this.complaintService.postComplaint(complaint, request);
  }

  // @Get(':id')
  // public async getComplaintById(@Param('id') id): Promise<Complaint> {
  //   return this.complaintService.getComplaintById(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getComplaintById_User(
    // @Param('id') id,
    @Req() request: Request,
  ): Promise<Complaint[]> {
    return this.complaintService.getComplaintById_User(request);
  }

  @Delete(':id')
  public async deleteComplaintById(@Param('id') id): Promise<Complaint> {
    return this.complaintService.deleteComplaintById(id);
  }

  @Put('/review/:id')
  public async putComplaintById_review(@Param('id') id): Promise<JSON> {
    return this.complaintService.putComplaintById_review(id);
  }

  @Put('/submit/:id')
  public async putComplaintById_submit(@Param('id') id): Promise<JSON> {
    return this.complaintService.putComplaintById_submit(id);
  }
}
