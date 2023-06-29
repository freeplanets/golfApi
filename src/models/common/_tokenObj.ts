import { ApiProperty } from "@nestjs/swagger";
import { tokenObj } from "../if";

export default class _tokenObj implements tokenObj {
	@ApiProperty({
		description: '新驗證權杖, 使用於  verifyHeader / verify token, used in verifyHeader',
	})
	token?: string;
	@ApiProperty({
		description: '更新用驗證權杖',
	})
	refreshToken?: string;
}