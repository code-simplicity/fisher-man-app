import { Test, TestingModule } from '@nestjs/testing';
import { PublicToolService } from './public-tool.service';

describe('PublicToolService', () => {
  let service: PublicToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicToolService],
    }).compile();

    service = module.get<PublicToolService>(PublicToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
