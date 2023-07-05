import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManageController } from './controller/ManageController';
import { AppService } from './app.service';
import InDataController from './controller/InDataController';
import GameController from './controller/GameController';

@Module({
  imports: [],
  controllers: [AppController, ManageController, InDataController, GameController],
  providers: [AppService],
})
export class AppModule {}
