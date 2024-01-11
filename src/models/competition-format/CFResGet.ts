import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import CompetitionFormatModel from "./CompetitionFormatModel";
import { competitionFormat } from "../../database/db.interface";

export default class CFResGet extends commonResponse implements commonResWithData<competitionFormat> {
    @ApiProperty({
        description: '賽制資料',
        type: CompetitionFormatModel,
    })
    data?: competitionFormat;
}