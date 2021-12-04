import { Controller, Get, Header } from '@nestjs/common';
import { readFileSync } from 'fs';

@Controller('languages')
export class LanguagesController {
  @Get()
  @Header('Content-Type', 'text/javascript; charset=utf-8')
  public async get(): Promise<String> {
    const file = await readFileSync('supportedLanguages.js', 'utf-8');

    return file;
  }
}
