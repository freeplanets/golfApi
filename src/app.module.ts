import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DynamooseModule, DynamooseModuleOptions } from 'nestjs-dynamoose';
import awsOptions from './aws.info';
import { AppController } from './app.controller';
import GamesModule from './database/game/games.module';
import { ConfigModule } from '@nestjs/config';
let options:DynamooseModuleOptions = awsOptions;
// console.log('env:', process.env);
if(process.env.IS_OFFLINE || process.env.NODE_ENV === 'test') {
  options = { local:true };
} 
@Module({
  imports: [
    ConfigModule.forRoot(),
    DynamooseModule.forRoot(options),
    GamesModule,
  ],
  controllers: [AppController],
  providers: [ AppService ],
})
export class AppModule {}
