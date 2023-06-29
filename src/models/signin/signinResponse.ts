import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { commonResWithData } from "../if";
import _errObj from "../common/_errObj";
import _signinResData from "../common/_signinResData";


export default class signinResponse implements commonResWithData<_signinResData> {
	@ApiProperty({
		description: '結果代碼',
	})
	errcode: string;
	@ApiProperty({
		description: '錯誤訊息物件',
	})
	error: _errObj;
	@ApiProperty({
		description: '資料物件',
	})
	data: _signinResData;
}