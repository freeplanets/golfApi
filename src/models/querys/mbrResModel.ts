import { membersHcp } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import MembersHcpModel from "./MembersHcpModel";

export default class mbrResModel extends commonResponse implements commonResWithData<Partial<membersHcp>[]> {
    @ApiProperty({
        description: '會員列表',
        type: [MembersHcpModel],
    })
    data?: Partial<membersHcp>[];
}