import { Test, TestingModule } from '@nestjs/testing';
import { PoliceOfficerController } from './police-officer.controller';

describe('PoliceOfficerController', () => {
  let controller: PoliceOfficerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoliceOfficerController],
    }).compile();

    controller = module.get<PoliceOfficerController>(PoliceOfficerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
