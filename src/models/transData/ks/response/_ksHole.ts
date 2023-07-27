import { ApiProperty } from "@nestjs/swagger";
import { ksHoleType } from "../ks.enum";
import { ksHole, ksLang } from "../ks.interface";
import _ksLangObject from "./_ksLangObject";

export default class _ksHole implements ksHole {
	@ApiProperty({
		description: '球洞代號',
	})
	id: string;

	@ApiProperty({
		description: '序號',
	})
	number: number;

	@ApiProperty({
		description: '語言',
		type: _ksLangObject,
	})
	name: ksLang;

	@ApiProperty({
		description: '差點 HCP',
	})
	handicap: number;

	@ApiProperty({
		description: '標準桿',
	})
	par: number;

	@ApiProperty({
		description: '標準擊球時間',
	})
	standardTime: number;

	@ApiProperty({
		description: '球道難易類型',
		enum: ksHoleType
	})
	_type: ksHoleType;
}