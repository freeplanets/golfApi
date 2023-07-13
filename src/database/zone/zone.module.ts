import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import ZoneSchema from "./zone.schema";
import ZoneController from "../../controller/manage/ZoneController";
import ZoneService from "./zone.service";

@Module({
	imports:[
		DynamooseModule.forFeature([{
			name: 'Zone',
			schema: ZoneSchema,
		}]),
	],
	controllers: [ZoneController],
	providers:[ZoneService],
	exports:[ZoneService],
})
export default class ZoneModule {}