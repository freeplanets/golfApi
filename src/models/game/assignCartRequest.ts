import { ApiProperty } from "@nestjs/swagger";
import { games } from "../../database/db.interface";

export default class assignCartRequest implements Partial<games> {
	@ApiProperty({
		description: '球車代號',
		isArray: true,
		type: String,
	})
	carts?: string[];
}