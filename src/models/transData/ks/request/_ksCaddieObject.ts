import { ApiProperty } from "@nestjs/swagger";
import { ksCaddie } from "../ks.interface";
import { IsString } from "class-validator";

export default class _ksCaddieObject implements ksCaddie {
	@ApiProperty({
		description: '桿弟代號',
	})
	@IsString()
	number: string;
}