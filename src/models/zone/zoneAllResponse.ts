import { Zone } from "src/database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import zoneData from "./zoneData";

export default class zoneAllResponse extends commonResponse implements commonResWithData<Zone[]> {
	@ApiProperty({
		description: '所有分區資料',
		isArray:true,
		type: zoneData,
	})
	data?: Zone[];
}