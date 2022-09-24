import { Test, TestingModule } from '@nestjs/testing';
import { FisherManServiceController } from './fisher-man-service.controller';
import { FisherManServiceService } from './fisher-man-service.service';

describe('FisherManServiceController', () => {
  let fisherManServiceController: FisherManServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FisherManServiceController],
      providers: [FisherManServiceService],
    }).compile();

    fisherManServiceController = app.get<FisherManServiceController>(FisherManServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fisherManServiceController.getHello()).toBe('Hello World!');
    });
  });
});
