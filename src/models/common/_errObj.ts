import { ApiProperty } from "@nestjs/swagger";
import { AnyObject, errObj } from "../if";
import { IsString } from "class-validator";

export default class _errObj implements errObj {
	@ApiProperty({
		description: "錯誤訊息",
	})
	@IsString()
	message: string;
	@ApiProperty({
		description: "訊息物件",
		required: false,
	})
	extra?: AnyObject;
}