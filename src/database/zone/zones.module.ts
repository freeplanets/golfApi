import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import ZoneController from "../../controller/manage/ZoneController";
import ZonesSchema from "./zones.schema";
import ZonesService from "./zones.service";

@Module({
	imports:[
		DynamooseModule.forFeature([{
			name: 'Zones',
			schema: ZonesSchema,
			options: {
				throughput: 'ON_DEMAND',
			}
		}]),
	],
	controllers: [ZoneController],
	providers:[ZonesService],
	exports:[ZonesService],
})
export default class ZonesModule {}