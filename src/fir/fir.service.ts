import { Injectable } from '@nestjs/common';
import { FirDto } from './fir.dto';

@Injectable()
export class FirService {
    public async getFir() {}
    public async postFir(newFir: FirDto) {}
    public async getFirById(id: string) {}
    public async deleteFirById(id: string) {}
    public async putFirById(id: string,
        propertyName: string,
        propertyValue: string) {}
}
