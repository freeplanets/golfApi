import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import DataTransController from "../../controller/api/DataTransController";
import GamesSchema from "./games.schema";
import GamesService from "./games.service";
import ZonesModule from "../zone/zones.module";
import CouresModule from "../course/courses.module";
import GameController from "../../controller/manage/GameController";
import CartsModule from "../cart/carts.module";
import InCartController from "../../controller/cart/InCartController";
import DevicesModule from "../device/devices.module";
import ScoresSchema from "./scores.schema";

@Module({
	imports: [
		DevicesModule,
		CartsModule,
		ZonesModule,
		CouresModule,
		DynamooseModule.forFeature([
			{
				name: 'Games',
				schema: GamesSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			},
			{
				name: 'Scores',
				schema: ScoresSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			}
		])
	],
	controllers: [DataTransController, GameController, InCartController],
	providers: [GamesService],
	exports: [GamesService],
})
export default class GamesModule {}