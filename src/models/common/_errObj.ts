import { ApiProperty } from "@nestjs/swagger";
import { errObj } from "../if";

export default class _errObj implements errObj {
	@ApiProperty({
		description: "錯誤訊息",
	})
	message: string;
	@ApiProperty({
		description: "訊息物件"
	})
	extra?: { [key: string]: any; };
}