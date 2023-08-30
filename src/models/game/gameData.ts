import { ApiProperty } from "@nestjs/swagger";
import { games } from "../../database/db.interface";
import _playerObject from "./_playerObject";
import _playerDefault from "./_playerDefault";
import _sideGameObject from "./_sideGameObject";
import _caddieObject from "./_caddieObject";
import gamePartialData from "./gamePartialData";

export default class gameData extends gamePartialData implements games {
	@ApiProperty({
		description: 'hbu hashkey',
	})
	gameid: string;
}