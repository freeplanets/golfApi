import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData, positonReq } from "../if";
import positionRequest from "./positionRequest";

export default class positionResponse extends commonResponse implements commonResWithData<positonReq[]> {
	@ApiProperty({
		description: '球道中所有球車資料',
		isArray: true,
		type: positionRequest,
		required: false,
	})
	data?: positonReq[];
}