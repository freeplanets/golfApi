import { ApiProperty } from "@nestjs/swagger";
import { updatePassword } from "../if";

export default class updatePasswordRequest implements updatePassword {
	@ApiProperty({
		description: '原密碼 / original password',
	})
	oldPassword: string;
	@ApiProperty({
		description: '新密碼 / new password',
	})
	newPassword: string;
	@ApiProperty({
		description: '確認新密碼 / confirm password',
	})
	newPassword2: string;
}