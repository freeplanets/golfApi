import { Zone } from "src/database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import zoneData from "./zoneData";

export default class zoneModifyResponse extends commonResponse implements commonResWithData<Zone> {
	@ApiProperty({
		description: '回傳分區資料',
		type: zoneData,
		required: false,
	})
	data?: Zone;
}