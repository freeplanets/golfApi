import { zones } from "src/database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import zoneData from "./zonesData";

export default class zoneResponse extends commonResponse implements commonResWithData<zones> {
	@ApiProperty({
		description: '區資料',
		type: zoneData,
	})
	data?: zones;
}