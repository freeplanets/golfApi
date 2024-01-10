import { Test, TestingModule } from '@nestjs/testing';
import CompetitionFormatController from './competition-format.controller';

describe('CompetitionFormatController', () => {
  let controller: CompetitionFormatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitionFormatController],
    }).compile();

    controller = module.get<CompetitionFormatController>(CompetitionFormatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
