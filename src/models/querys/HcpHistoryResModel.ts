import { ApiProperty } from "@nestjs/swagger";
import { handicapHistory } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import HandicapHistoryModel from "./HandicapHistoryModel";

export default class HcpHistoryResModel extends commonResponse implements commonResWithData<Partial<handicapHistory>[]> {
    @ApiProperty({
        description: '會員差點列表',
        type:[HandicapHistoryModel],
    })
    data?: Partial<handicapHistory>[];
}