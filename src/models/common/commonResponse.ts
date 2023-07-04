import { ApiProperty } from "@nestjs/swagger";
import { commonRes, errObj } from "../if";
import _errObj from "./_errObj";
import { IsString } from "class-validator";

export default class commonResponse implements commonRes {
	@ApiProperty({
		description: '錯誤代碼, 0 表無錯誤 / error code, 0 means no error',
	})
	@IsString()
	errcode: string;
	@ApiProperty({
		description: '錯誤訊息 / advanced error messages',
		required: false,
		type: _errObj,
	})
	error?: errObj;
}