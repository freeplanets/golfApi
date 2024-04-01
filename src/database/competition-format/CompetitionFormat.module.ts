import { Module } from "@nestjs/common";
import { DynamooseModule } from "nestjs-dynamoose";
import CompetitionFormatSchema from "./competitionFormat.schema";
import CompetitionFormatController from "../../controller/manage/competition-format/competition-format.controller";
import CompetitionFormatService from "./CompetitionFormat.service";

@Module({
    imports: [
        DynamooseModule.forFeature([
            {
                name: 'CompetitionFormat',
                schema: CompetitionFormatSchema,
                options: {
                    throughput: 'ON_DEMAND',
                }
            }
        ])
    ],
    controllers: [CompetitionFormatController],
    providers: [CompetitionFormatService],
    exports: [CompetitionFormatService],
})
export default class CompetitionFormatModule {}