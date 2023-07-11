import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";

export default class getResultResponse extends commonResponse implements commonResWithData<any> {
	@ApiProperty({
		description: '結果輸出回傳資料'
	})
	data?: any;
}