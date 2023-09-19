import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CartsSchema from "./carts.schema";
import CartController from "../../controller/manage/CartController";
import CartsService from "./carts.service";
import DevicesModule from "../device/devices.module";
import SideGamesSchema from "../sidegame/sidegames.schema";
import SideGamesService from "../sidegame/sidegames.service";

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
			{
				name: 'SideGames',
				schema: SideGamesSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			}
		])
	],
	controllers: [CartController],
	providers: [CartsService, SideGamesService],
	exports: [CartsService, SideGamesService]
})
export default class CartsModule {}