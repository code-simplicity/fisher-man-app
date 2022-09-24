import { Test, TestingModule } from '@nestjs/testing';
import { PublicClassService } from './public-class.service';

describe('PublicClassService', () => {
  let service: PublicClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicClassService],
    }).compile();

    service = module.get<PublicClassService>(PublicClassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
