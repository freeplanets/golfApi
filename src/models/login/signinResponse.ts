import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";

export default class signinResponse {
	@ApiProperty({
		description: '結果代碼',
	})
	errcode:string;
	@ApiProperty({
		description: '錯誤訊息物件',
	})
	error: {[key:string]:string};
	@ApiProperty({
		description: '資料物件',
	})
	data: {[key:string]:string};
}