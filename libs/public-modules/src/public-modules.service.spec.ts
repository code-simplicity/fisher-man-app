import { Test, TestingModule } from '@nestjs/testing';
import { PublicModulesService } from './public-modules.service';

describe('PublicModulesService', () => {
  let service: PublicModulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicModulesService],
    }).compile();

    service = module.get<PublicModulesService>(PublicModulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
