import { ApiProperty } from "@nestjs/swagger";
import { defaultKey } from "src/database/db.interface";

export default class _defaultKey implements defaultKey {
	@ApiProperty({
		description: 'HashKey 不要修改, 新增資料時保持空白, 更新時須回傳',
	})
	id: string;
}
