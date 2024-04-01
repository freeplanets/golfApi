import { competitionRanking } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import CompetitionRankingModel from "./CompetitionRankingModel";

export default class CompetitionRankingResModel extends commonResponse implements commonResWithData<Partial<competitionRanking>[]> {
    @ApiProperty({
        description: '賽事排名資料',
        type: [CompetitionRankingModel]
    })
    data?: Partial<competitionRanking>[];
}