import { ApiProperty } from "@nestjs/swagger";
import { ksExtra, ksPlayer, ksTee } from "../ks.interface";
import _ksExtraObject from "../request/_ksExtraObject";
import _ksTeeObject from "../request/_ksTeeObject";

export default class _ksPlayerObject implements ksPlayer {
	@ApiProperty({
		description: '名稱',
	})
	name: string;

	@ApiProperty({
		description: '額外資訊',
		type: _ksExtraObject,
	})
	extra: ksExtra;

	@ApiProperty({
		description: 'tee資訊',
		type: _ksTeeObject,
	})
	tee: ksTee;
}