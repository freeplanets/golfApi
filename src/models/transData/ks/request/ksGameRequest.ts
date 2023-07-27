import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { ksCaddie, ksEvent, ksGameReq, ksPlayer, ksZoneReq } from "../ks.interface";
import _ksCaddieObject from "./_ksCaddieObject";
import _ksZoneReq from "./_ksZoneReq";
import _ksPlayerObject from "./_ksPlayerObject";
import _ksExtraObject from "./_ksExtraObject";
import _ksEventObject from "./_ksEventObject";

export default class ksGameRequest implements ksGameReq {
	@ApiProperty({
		description: '第一位桿弟資料',
		type: _ksCaddieObject,
	})
	caddie: ksCaddie;

	@ApiProperty({
		description: '第一位桿弟資料',
		type: _ksCaddieObject,
		required: false,
	})
	caddie2?: ksCaddie;

	@ApiProperty({
		description: '球場分區代號',
		isArray: true,
		type: _ksZoneReq,
	})
	zones: ksZoneReq[];

	@ApiProperty({
		description: '來賓資料',
		isArray: true,
		type: _ksPlayerObject,
	})
	players: ksPlayer[];

	@ApiProperty({
		description: '開球時間',
	})
	@IsNumber()
	teeOffTimestamp: number;

	@ApiProperty({
		description: '賽事',
		required: false,
		type: _ksEventObject,
	})
	event?: ksEvent;
}