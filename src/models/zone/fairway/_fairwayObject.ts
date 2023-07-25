import { ApiProperty } from "@nestjs/swagger";
import { fairwayObject, greenObject, mapObject, teeObject } from "../../../database/db.interface";
import { IsNumber } from "class-validator";
import _mapObject from "../../common/_mapObject";
import _greenObject from "./_greenObject";
import _teeObject from "./_teeObject";

export default class _fairwayObject  implements fairwayObject {
	@ApiProperty({
		description: '球道編號',
	})
	@IsNumber()
	fairwayno: number;

	@ApiProperty({
		description:'T台',
		isArray:true,
		type: _teeObject,
	})
	tees: teeObject[];

	@ApiProperty({
		description: '標準桿桿數',
	})
	@IsNumber()
	par: number;

	@ApiProperty({
		description: '差點',
	})
	@IsNumber()
	handicap: number;


	@ApiProperty({
		description: '球道圖資訊',
		required: false,
		type: _mapObject,
	})
	fairwayMap?: mapObject;

	@ApiProperty({
		description:'果領資料',
		isArray:true,
		type: _greenObject,
	})
	greens?: greenObject[];
}