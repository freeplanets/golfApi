import { ApiProperty } from "@nestjs/swagger";
import { oneOfType } from "../../function/func.interface";

export default class _oneOfType implements oneOfType {
	@ApiProperty({
		description: '字串,數字,布林',
	})
	oneOf: string | number | boolean;
}