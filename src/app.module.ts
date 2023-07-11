import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManageController } from './controller/ManageController';
import { AppService } from './app.service';
import InDataController from './controller/InDataController';
import GameController from './controller/GameController';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import awsOptions from './aws.info';
import ClubModule from './database/club/club.module';
import ClubController from './controller/ClubController';

let options:DynamooseModuleOptions = awsOptions;
if(process.env.IS_OFFLINE) {
  options = { local:true };
} 

@Module({
  imports: [
    DynamooseModule.forRoot(options),
    ClubModule,
  ],
  controllers: [AppController, ManageController, InDataController, GameController, ClubController],
  providers: [ AppService ],
})
export class AppModule {}
