import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import awsOptions from './aws.info';
import { AppController } from './app.controller';
import GamesModule from './database/game/games.module';

let options:DynamooseModuleOptions = awsOptions;
if(process.env.IS_OFFLINE) {
  options = { local:true };
} 

@Module({
  imports: [
    DynamooseModule.forRoot(options),
    GamesModule,
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}
