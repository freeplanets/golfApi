import { ApiProperty } from "@nestjs/swagger";
import { reset2FA } from "../if";

export default class reset2FARquest implements reset2FA {
	@ApiProperty({
		description: '重置2FA需要輸入密碼驗證身分',
	})
	password: string;
}