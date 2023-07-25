import { ApiProperty } from "@nestjs/swagger";
import { InDataExtra, player, tee } from "./checkin.interface";
import { IsString } from "class-validator";
import _tee from "./_tee";
import _extra from "./_extra";

export default class _player implements player {
	@ApiProperty({
		description: '來賓姓名',
	})
	@IsString()
	name: string;
	@ApiProperty({
		description: 'T 台',
		type: _tee,
	})
	tee: tee;
	@ApiProperty({
		description: '來賓資料',
		type: _extra,
	})
	extra: InDataExtra;
}