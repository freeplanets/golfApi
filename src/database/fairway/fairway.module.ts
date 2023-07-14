import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import FairwaySchema from "./fairway.schema";
import FairwayController from "../../controller/manage/FairwayController";
import FairwayService from "./fairway.service";

@Module({
	imports:[
		DynamooseModule.forFeature([{
			name: 'Fairway',
			schema: FairwaySchema,
		}]),
	],
	controllers: [FairwayController],
	providers: [FairwayService],
	exports:[FairwayService],
})
export default class FairwayModule {}