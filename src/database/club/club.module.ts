import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import { ClubSchema } from "./club.schema";
import ClubService from "./club.service";
import ClubController from "../../controller/ClubController";

@Module({
	imports: [
		DynamooseModule.forFeature([{
			name: 'Club',
			schema: ClubSchema,
		}]),
	],
	controllers: [ClubController],
	providers: [
		ClubService,
	],
	exports: [
		ClubService,
	],
})
export default class ClubModule {}