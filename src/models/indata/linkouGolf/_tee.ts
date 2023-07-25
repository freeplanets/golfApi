import { ApiProperty } from "@nestjs/swagger";
import { tee } from "./checkin.interface";
import { IsString } from "class-validator";

export default class _tee implements tee {
	@ApiProperty({
		description: 'Tee台名稱',
	})
	@IsString()
	name: string;
}