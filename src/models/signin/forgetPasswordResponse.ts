import { ApiProperty } from "@nestjs/swagger";
import { commonResWithData, errObj, rstToken } from "../if";

export default class forgetPasswordReponse implements commonResWithData<rstToken> {
	@ApiProperty({
		description: '錯誤代碼, 0 表無錯誤 / error code, 0 means no error',
	})
	errcode: string;
	@ApiProperty({
		description: '錯誤訊息 / advanced error messages',
	})
	error?: errObj;
	@ApiProperty({
		description: '重置權杖 / reset password token',
	})
	data?: rstToken;
}