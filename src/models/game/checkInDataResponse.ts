import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
// import _checkInData from "../common/_checkInData";
import { checkinLinkouGolf } from "../indata/linkouGolf/checkin.interface";

export default class checkInDataResponse extends commonResponse implements commonResWithData<checkinLinkouGolf> {
	@ApiProperty({
		description: '剛報到來賓資料',
	})	
	data?: checkinLinkouGolf;
}