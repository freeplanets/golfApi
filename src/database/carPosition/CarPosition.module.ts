import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CarPositionSchema from "./CarPosition.schema";
import CarPositionHistorySchema from "./CarPositionHistory.schema";
import CarPositionController from "../../controller/manage/CarPositionController";
import CarPositionService from "./CarPosition.service";

@Module({
	imports: [
		DynamooseModule.forFeature([
			{name: 'CarPosition', schema: CarPositionSchema},
			{name: 'CarPositionHistory', schema: CarPositionHistorySchema},
		]),
	],
	controllers: [CarPositionController],
	providers: [CarPositionService],
	exports:[CarPositionService],
})
export default class CarPositionModule {}