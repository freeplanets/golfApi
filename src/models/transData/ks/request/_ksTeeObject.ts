import { ApiProperty } from "@nestjs/swagger";
import { ksTee } from "../ks.interface";
import { IsString } from "class-validator";

export default class _ksTeeObject implements ksTee {
	@ApiProperty({
		description: 'Tee台名稱',
	})
	@IsString()
	name: string;
}