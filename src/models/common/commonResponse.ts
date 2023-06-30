import { ApiProperty } from "@nestjs/swagger";
import { commonRes } from "../if";
import _errObj from "./_errObj";

export default class commonResponse implements commonRes {
	@ApiProperty({
		description: '錯誤代碼, 0 表無錯誤 / error code, 0 means no error',
	})
	errcode: string;
	@ApiProperty({
		description: '錯誤訊息 / advanced error messages',
		nullable: true,
	})
	error?: _errObj;
}