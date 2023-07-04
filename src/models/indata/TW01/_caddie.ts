import { ApiProperty } from "@nestjs/swagger";
import { caddie } from "./ifInData";
import { IsString } from "class-validator";

export default class _caddie implements caddie {
	@ApiProperty({
		description: '桿弟代號',
	})
	@IsString()
	number: string;
}