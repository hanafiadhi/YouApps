import { Test, TestingModule } from '@nestjs/testing';
import { ZozdiacService } from './zozdiac.service';

describe('ZozdiacService', () => {
  let service: ZozdiacService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZozdiacService],
    }).compile();

    service = module.get<ZozdiacService>(ZozdiacService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
