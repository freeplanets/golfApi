import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import DevicesSchema from "./devices.schema";
import DeviceController from "../../controller/manage/DeviceController";
import DevicesService from "./devices.service";

@Module({
	imports: [
		DynamooseModule.forFeature([
			{
				name: 'Devices',
				schema: DevicesSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			}
		])
	],
	controllers: [DeviceController],
	providers: [DevicesService],
	exports: [DevicesService],
})
export default class DevicesModule {}