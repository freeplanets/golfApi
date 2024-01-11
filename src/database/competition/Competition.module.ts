import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CompetitionService from "./Competition.service";
import CompetitionController from "../../controller/manage/competition/competition.controller";
import CompetitionSchema from "./Competition.schema";

@Module({
    imports:[
        DynamooseModule.forFeature([
            {
                name: 'Competition',
                schema: CompetitionSchema,
                options: {
                    throughput: 'ON_DEMAND',
                }
            }
        ]),
    ],
    controllers: [CompetitionController],
    providers:[CompetitionService],
})
export default class CompetitionModule {}