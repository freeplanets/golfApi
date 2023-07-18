import { courses } from "src/database/db.interface";
import _defaultKeyWithClubId from "../common/_defaultKeyWithClubId";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export default class courseData extends _defaultKeyWithClubId implements courses {
	@ApiProperty({
		description: '球道組合名稱',
	})
	@IsString()
	name: string;

	@ApiProperty({
		description: '起始區',
	})
	@IsString()
	outZone: string;

	@ApiProperty({
		description: '結束區',
	})
	@IsString()
	inZone?: string;

	@ApiProperty({
		description: '總洞數',
	})
	@IsNumber()
  Holes:number;

	@ApiProperty({
		description: '標準桿',
	})
	@IsNumber()
  Par?:number;

	@ApiProperty({
		description: '球道型態',
	})
	@IsString()
  Type?:string;

	@ApiProperty({
		description: '球道設計師',
	})
	@IsString()
  Architect?:string;

	@ApiProperty({
		description: '開放日期',
	})
	@IsDate()
  OpenDate?:string;
}