import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { checkInRes, commonResWithData } from "../if";
import checkInResData from "./checkInResData";

export default class checkInResponse extends commonResponse implements commonResWithData<checkInRes> {
	@ApiProperty({
		description: '編組、分區、球車等資料',
		type: checkInResData,
	})
	data?: checkInRes;
}