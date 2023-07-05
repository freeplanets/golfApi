import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { checkInData, commonResWithData } from "../if";
import _checkInData from "../common/_checkInData";

export default class checkInDataResponse extends commonResponse implements commonResWithData<checkInData> {
	@ApiProperty({
		description: '剛報到來賓資料',
		type: _checkInData,
	})	
	data?: checkInData;
}