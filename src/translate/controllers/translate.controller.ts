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
}
