import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import MembersHcpSchema from "./MembersHcp.schema";
import HandicapHistorySchema from "./HandicapHistory.schema";
import CompetitionRankingSchema from "./CompetitionRanking.schema";
import { QueryController } from "../../controller/manage/query/query.controller";
import MembersHcpService from "./MembersHcp.service";
import HandicapHistoryService from "./HandicapHistory.service";
import CompetitionRankingService from "./CompetitionRanking.service";

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'MembersHcp',
                schema: MembersHcpSchema,
                options: {
                    throughput: 'ON_DEMAND',
                }
            },
            {
                name: 'HandicapHistory',
                schema: HandicapHistorySchema,
                options: {
                    throughput: 'ON_DEMAND',
                }
            },
            {
                name: 'CompetitionRanking',
                schema: CompetitionRankingSchema,
                options: {
                    throughput: 'ON_DEMAND',
                }
            }
        ])
    ],
    controllers: [QueryController],
    providers:[MembersHcpService, HandicapHistoryService, CompetitionRankingService],
})
export default class QuerysModule {}