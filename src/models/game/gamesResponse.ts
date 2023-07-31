import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { games } from "../../database/db.interface";
import gameData from "./gameData";

export default class gamesResponse extends commonResponse implements commonResWithData<games[]> {
	@ApiProperty({
		description: '編組資料',
		isArray: true,
		type: gameData,
	})
	data?: games[];
}