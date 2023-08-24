import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CartsSchema from "./carts.schema";
import CartController from "../../controller/manage/CartController";
import CartsService from "./carts.service";
import DevicesModule from "../device/devices.module";

@Module({
	imports: [
		DevicesModule,
		DynamooseModule.forFeature([
			{
				name: 'Carts',
				schema: CartsSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			},
		])
	],
	controllers: [CartController],
	providers: [CartsService],
	exports: [CartsService]
})
export default class CartsModule {}