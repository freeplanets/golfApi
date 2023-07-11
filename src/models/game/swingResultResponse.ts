import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData, partialResult, sideGamesData, swingResult } from "../if";

export default class swingResultResponse extends commonResponse implements commonResWithData<partialResult> {
	@ApiProperty({
		description: '回傳擊球及小遊戲成績',
	})
	data: partialResult;
}