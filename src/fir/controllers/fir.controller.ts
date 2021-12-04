import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FirService } from '../service/fir.service';
import { FirDto } from '../dto/fir.dto';
import { Fir } from '../interfaces/fir.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('fir')
export class FirController {
  constructor(private readonly firService: FirService) {}

  @Get()
  getFir(): Promise<Fir[]> {
    return this.firService.getFir();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postFir(@Body() Firdto: FirDto, @Req() request: Request): Promise<Fir> {
    return this.firService.postFir(Firdto, request);
  }

  @Get(':id')
  getFirById(@Param('id') id): Promise<Fir> {
    return this.firService.getFirById(id);
  }

  @Get('/police/:id')
  public async getFirById_Police(@Param('id') id): Promise<Fir[]> {
    return this.firService.getFirById_Police(id);
  }

  @Delete(':id')
  deleteFirById(@Param('id') id): Promise<Fir> {
    return this.firService.deleteFirById(id);
  }

  @Put(':id')
  putFirById(@Body() updateFirDto: FirDto, @Param('id') id): Promise<Fir> {
    return this.firService.putFirById(id, updateFirDto);
  }
}
