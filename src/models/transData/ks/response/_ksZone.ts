import { ApiProperty } from "@nestjs/swagger";
import { ksLang, ksZone } from "../ks.interface";

export default class _ksZone implements ksZone {
	@ApiProperty({
		description: '球區代號',
	})
	id: string;

	@ApiProperty({
		description: '名稱',
	})
	name: ksLang;
}