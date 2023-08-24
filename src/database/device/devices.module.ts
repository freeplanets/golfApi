import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import DevicesSchema from "./devices.schema";
import DeviceController from "../../controller/manage/DeviceController";
import DevicesService from "./devices.service";
import DeviceHistorySchema from "./deviceHistory.schema";
import DeviceHistoryService from "./deviceHistory.service";

@Module({
	imports: [
		DynamooseModule.forFeature([
			{
				name: 'Devices',
				schema: DevicesSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			},
			{
				name: 'DeviceHistory',
				schema: DeviceHistorySchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			},
		])
	],
	controllers: [DeviceController],
	providers: [DevicesService, DeviceHistoryService],
	exports: [DevicesService, DeviceHistoryService],
})
export default class DevicesModule {}