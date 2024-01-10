import { ApiProperty } from "@nestjs/swagger";
import { games } from "../../database/db.interface";
import _playerObject from "./_playerObject";
import _playerDefault from "./_playerDefault";
import _sideGameObject from "./_sideGameObject";
import _caddieObject from "./_caddieObject";
import gamePartialData from "./gamePartialData";
import { gameStatus } from "../enum";
import { AnyObject } from "../if";

export default class gameData extends gamePartialData implements games {
	@ApiProperty({
		description: 'hbu hashkey',
	})
	gameid: string;
	
	@ApiProperty({
		description: '分組狀態',
		enum: gameStatus,
	})
	status: number;

	@ApiProperty({
		description: '外部系統商參照key',
		required: false,
	})
	refKey?: string;

	@ApiProperty({
		description: '外部系統商提供的其他訊息',
		required: false,
	})
	extra?: AnyObject;
}