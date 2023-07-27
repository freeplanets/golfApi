import { ApiProperty } from "@nestjs/swagger";
import { ksExtra, ksPlayer, ksTee } from "../ks.interface";
import { IsString } from "class-validator";
import _ksTeeObject from "./_ksTeeObject";
import _ksExtraObject from "./_ksExtraObject";

export default class _ksPlayerObject implements ksPlayer {
	@ApiProperty({
		description: '來賓姓名',
	})
	@IsString()
	name: string;
	@ApiProperty({
		description: 'T 台',
		type: _ksTeeObject,
	})
	tee: ksTee;

	@ApiProperty({
		description: '來賓資料',
		type: _ksExtraObject,
	})
	extra: ksExtra;
}