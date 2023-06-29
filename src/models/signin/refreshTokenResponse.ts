import { ApiProperty } from "@nestjs/swagger";
import _tokenObj from "../common/_tokenObj";
import { commonResWithData, errObj } from "../if";

export default class refreshTokenResponse implements commonResWithData<_tokenObj> {
	@ApiProperty({
		description: '錯誤代碼, 0 表無錯誤 / error code, 0 means no error',
	})
	errcode: string;
	@ApiProperty({
		description: '錯誤訊息 / advanced error messages',
	})
	error?: errObj;
	@ApiProperty({
		description: '新驗證權杖',
	})
	data: _tokenObj;
}