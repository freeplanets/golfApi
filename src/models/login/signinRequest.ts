import { ApiProperty } from "@nestjs/swagger";

export default class signinRequest {
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