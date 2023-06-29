import { ApiProperty } from "@nestjs/swagger";
import { verify2fa } from "../if";

export default class verify2faRequest implements verify2fa {
	@ApiProperty({
		description: '兩階段認証碼',
	})
	twoFAcode: string;
}