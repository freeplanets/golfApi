import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { carPosition } from "../../database/db.interface";
import positionRequest from "../manage/positionRequest";

export default class carInFairwayResponse extends commonResponse implements commonResWithData<carPosition[]> {
	@ApiProperty({
		description: '回傳同一球道中所有球車的位置',
		isArray: true,
		type: positionRequest,
	})
	data?: carPosition[];
}