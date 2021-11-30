import { Test, TestingModule } from '@nestjs/testing';
import { PoliceOfficerService } from './police-officer.service';

describe('PoliceOfficerService', () => {
  let service: PoliceOfficerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoliceOfficerService],
    }).compile();

    service = module.get<PoliceOfficerService>(PoliceOfficerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
