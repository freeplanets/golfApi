import { ApiProperty } from "@nestjs/swagger";
import { competition } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import CompetitionModel from "./CompetitionModel";

export default class GTResQuery extends commonResponse implements commonResWithData<competition[]> {
    @ApiProperty({
        description: '賽事列表',
        type: [CompetitionModel],
    })
    data?: competition[];
}