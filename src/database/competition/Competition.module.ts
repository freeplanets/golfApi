import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CompetitionService from "./Competition.service";
import CompetitionController from "../../controller/manage/competition/competition.controller";
import CompetitionSchema from "./Competition.schema";
// import CompetitionFormatModule from "../competition-format/CompetitionFormat.module";
// import ZonesService from "../zone/zones.service";
import ZonesModule from "../zone/zones.module";

@Module({
    imports:[
        ZonesModule,
        // CompetitionFormatModule,
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
    exports:[CompetitionService],
})
export default class CompetitionModule {}