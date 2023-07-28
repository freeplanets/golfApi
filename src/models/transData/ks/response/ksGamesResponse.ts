import commonResponse from "../../../../models/common/commonResponse";
import { commonResWithData } from "../../../../models/if";
import { ksGame } from "../ks.interface";
import { ApiProperty } from "@nestjs/swagger";
import _ksGame from "./_ksGame";

export default class ksGamesResponse extends commonResponse implements commonResWithData<ksGame[]> {
	@ApiProperty({
		description: '成績',
		isArray: true,
		type: _ksGame,
	})
	data?: ksGame[];
}