import { zones } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import zoneData from "./zonesData";

export default class zonesResponse extends commonResponse implements commonResWithData<zones[]> {
	@ApiProperty({
		description: '所有分區資料',
		isArray:true,
		type: zoneData,
	})
	data?: zones[];
}