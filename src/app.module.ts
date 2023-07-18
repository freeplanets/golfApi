import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import InDataController from './controller/InDataController';
import GameController from './controller/GameController';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import awsOptions from './aws.info';
import ZoneModule from './database/zone/zone.module';
import ZoneController from './controller/manage/ZoneController';
import FairwayModule from './database/fairway/fairway.module';
import FairwayController from './controller/manage/FairwayController';
import CarPositionModule from './database/carPosition/CarPosition.module';
import CarPositionController from './controller/manage/CarPositionController';
import CouresModule from './database/courses/courses.module';
import CoursesController from './controller/manage/CoursesController';

let options:DynamooseModuleOptions = awsOptions;
if(process.env.IS_OFFLINE) {
  options = { local:true };
} 

@Module({
  imports: [
    DynamooseModule.forRoot(options),
    ZoneModule,
    FairwayModule,
    CouresModule,
    CarPositionModule,
  ],
  controllers: [AppController, ZoneController, FairwayController, InDataController, GameController, CoursesController, CarPositionController],
  providers: [ AppService ],
})
export class AppModule {}
