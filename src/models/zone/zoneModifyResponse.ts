import { zones } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import zoneData from "./zonesData";

export default class zoneModifyResponse extends commonResponse implements commonResWithData<zones> {
	@ApiProperty({
		description: '回傳分區資料',
		type: zoneData,
		required: false,
	})
	data?: zones;
}