import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './volunteer.controller';
import { VolunteerService } from './volunteer.service';

describe('VolunteerController', () => {
  let controller: ProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [VolunteerService],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
