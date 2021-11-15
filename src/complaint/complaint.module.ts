import { Module } from '@nestjs/common';
import { ComplaintService } from './complaint.service';

@Module({
  providers: [ComplaintService]
})
export class ComplaintModule {}
