import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import DataTransController from "../../controller/api/DataTransController";
import GamesSchema from "./games.schema";
import GamesService from "./games.service";
import ZonesModule from "../zone/zones.module";
import CouresModule from "../course/courses.module";

@Module({
	imports: [
		ZonesModule,
		CouresModule,
		DynamooseModule.forFeature([
			{
				name: 'Games',
				schema: GamesSchema,
				options: {
					throughput: 'ON_DEMAND',
				}
			}
		])
	],
	controllers: [DataTransController],
	providers: [GamesService],
	exports: [GamesService],
})
export default class GamesModule {}