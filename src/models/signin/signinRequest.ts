import { ApiProperty } from "@nestjs/swagger";
import { signinReq } from "../if";

export default class signinRequest implements signinReq  {
	@ApiProperty({
		description: '使用者名稱',
	})
	username: string;
	@ApiProperty({
		description: '使用者密碼',
	})
	password: string;

	@ApiProperty({
		description: '驗證碼',
	})
	reCAPTCHAToken: string;
}