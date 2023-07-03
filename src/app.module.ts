import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ManageController } from './controller/ManageController';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, ManageController],
  providers: [AppService],
})
export class AppModule {}
