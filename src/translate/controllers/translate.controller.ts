import { Controller, Get, Header } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller('translate')
export class TranslateController {
  @Get()
  @Header('Content-Type', 'text/javascript; charset=utf-8')
  public async get(): Promise<String> {
    const file = await readFileSync('translate.js', 'utf-8');

    return file;
  }

  @Get('/main')
  @Header('Content-Type', 'text/javascript; charset=utf-8')
  async getMain(): Promise<String> {
    const file = await readFileSync('translateMain.js', 'utf-8');

    return file;
  }

  @Get('/time-series')
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getTimeSeries(): Promise<String> {
    const file = await readFileSync('timeseries.json', 'utf-8');

    return file;
  }

  @Get('/time-series-original')
  @Header('Content-Type', 'application/json; charset=utf-8')
  async getTimeSeriesOriginal(): Promise<String> {
    const file = await readFileSync('timeseries-original.json', 'utf-8');

    return file;
  }
}
