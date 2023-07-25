import { devices } from "src/database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import deviceData from "./deviceData";

export default class devicesResponse extends commonResponse implements commonResWithData<devices[]> {
	@ApiProperty({
		description: '裝置資料',
		isArray: true,
		type: deviceData,
	})
	data?: devices[];
}