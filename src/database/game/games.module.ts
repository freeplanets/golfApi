import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
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
// import ScoresSchema from "./scores.schema";
import PlayerResult from "../playerResult/playerResult.schema";
import PlayerResultService from "../playerResult/playerResult.service";
import CompetitionFormatModule from "../competition-format/CompetitionFormat.module";
import { PlatformTokenChecker } from "../../class/middleware/platformTokenChecker";
import GameTitleModule from "../game-title/GameTitle.module";

@Module({
	imports: [
		DevicesModule,
		CartsModule,
		ZonesModule,
		CouresModule,
		CompetitionFormatModule,
		GameTitleModule,
		DynamooseModule.forFeature([
			{
				name: 'Games',
				schema: GamesSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			},
			{
				name: 'PlayerResult',
				schema: PlayerResult,
				options : {
					throughput: 'ON_DEMAND',
				}
			}
		])
	],
	controllers: [DataTransController, GameController, InCartController],
	providers: [GamesService, PlayerResultService],
	exports: [GamesService, PlayerResultService],
})
export default class GamesModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(PlatformTokenChecker)
		.exclude({path: '/cart/deviceLocation/:deviceid', method: RequestMethod.POST})
		.forRoutes('manage', 'cart');		
	}
}