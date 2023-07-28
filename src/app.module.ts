import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import awsOptions from './aws.info';
import { AppController } from './app.controller';
import ZonesModule from './database/zone/zones.module';
import CouresModule from './database/course/courses.module';
import CartsModule from './database/cart/carts.module';
import DevicesModule from './database/device/devices.module';
import DataTransController from './controller/api/DataTransController';
import GamesModule from './database/game/games.module';

let options:DynamooseModuleOptions = awsOptions;
if(process.env.IS_OFFLINE) {
  options = { local:true };
} 

@Module({
  imports: [
    DynamooseModule.forRoot(options),
    // ZonesModule,
    // FairwayModule,
    // CouresModule,
    // CarPositionModule,
    CartsModule,
    DevicesModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}
