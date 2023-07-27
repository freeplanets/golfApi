import { ApiProperty } from "@nestjs/swagger";
import { ksLang } from "../ks.interface";

export default class _ksLangObject implements ksLang {
	@ApiProperty({
		description: '預設語言',
	})
	_default: string;

	@ApiProperty({
		description: '繁中',
	})
	zhTW: string;

	@ApiProperty({
		description: '日文',
	})
	jaJP: string;

	@ApiProperty({
		description: '韓文',
		required: false,
	})
	koKR?: string;

	@ApiProperty({
		description: '簡中',
		required: false,
	})
	zhCN?: string;
}