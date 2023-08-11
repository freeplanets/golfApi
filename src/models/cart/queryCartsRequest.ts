import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { carts } from "src/database/db.interface";
import { CartStatus } from "../../function/func.interface";

export default class queryCartsRequest implements Partial<carts> {
	@ApiProperty({
		description: '球車名稱',
		required: false,
	})
	@IsString()
	cartName: string;

	@ApiProperty({
		description: '球場代號',
	})
	@IsString()
	siteid: string;

	@ApiProperty({
		description: '球區代號',
		required: false,
	})
	@IsString()
	zoneid?: string;

	@ApiProperty({
		description: '球車代號',
		required: false,
	})
	@IsNumber()
	fairwayno?: number;

	@ApiProperty({
		description: '球車狀態',
		enum: CartStatus,
		required: false,
	})
	@IsString()
	status?: CartStatus;
}