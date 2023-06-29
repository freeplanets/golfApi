import { ApiProperty } from "@nestjs/swagger";
import { commonRes } from "../if";
import _errObj from "../common/_errObj";


export default class verify2faResponse implements commonRes {
	@ApiProperty({
		description: '錯誤代碼, 0 表無錯誤 / error code, 0 means no error',
	})
	errcode: string;
	@ApiProperty({
		description: '錯誤訊息 / advanced error messages',
	})
	error?: _errObj;
}