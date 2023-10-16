import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { gamesInfo } from "../if";

export default class gamesInfoResponse extends commonResponse implements gamesInfo {
	@ApiProperty({
		description: '等侯派車組數',
	})
	waitForCart: number;

	@ApiProperty({
		description: '擊球中組數',
	})	
	onGame: number;

	@ApiProperty({
		description: '己結束組數',
	})	
	ended: number;

	@ApiProperty({
		description: '總組數',
	})
	total: number;
}