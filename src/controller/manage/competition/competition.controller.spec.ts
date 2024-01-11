import { Test, TestingModule } from '@nestjs/testing';
import  GameTitleController from './competition.controller';

describe('GameTitleController', () => {
  let controller: GameTitleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameTitleController],
    }).compile();

    controller = module.get<GameTitleController>(GameTitleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
