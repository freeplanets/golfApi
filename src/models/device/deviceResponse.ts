import { devices } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import deviceData from "./deviceData";

export default class deviceReponse extends commonResponse implements commonResWithData<devices> {
	@ApiProperty({
		description: '裝置資料',
		type: deviceData,
	})
	data?: devices;
}