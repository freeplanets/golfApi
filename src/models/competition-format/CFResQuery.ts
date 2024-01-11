import { ApiProperty } from "@nestjs/swagger";
import { competitionFormat } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import CompetitionFormatModel from "./CompetitionFormatModel";

export default class CFResQuery extends commonResponse implements commonResWithData<competitionFormat[]> {
    @ApiProperty({
        description: '賽制列表',
        type: [CompetitionFormatModel],
    })
    data?: competitionFormat[];
}