import { Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query, } from '@nestjs/common';
import { FirService } from './fir.service';
import { FirDto } from './fir.dto';

@Controller('fir')
export class FirController {
    constructor(private firService: FirService) {}

    @Get()
    public async getFir() {
      return this.firService.getFir();
    }
  
    @Post()
    public async postFir(@Body() officer: FirDto) {
      return this.firService.postFir(officer);
    }
  
    @Get(':id')
    public async getFirById(@Param('id') id: string) {
      return this.firService.getFirById(id);
    }
  
    @Delete(':id')
    public async deleteFirrById(@Param('id') id: string) {
      return this.firService.deleteFirById(id);
    }
  
    @Put(':id')
    public async putFirById(@Param('id') id: string, @Query() query) {
      const propertyName = query.property_name;
      const propertyValue = query.property_value;
      return this.firService.putFirById(id, propertyName, propertyValue);
    }
}
