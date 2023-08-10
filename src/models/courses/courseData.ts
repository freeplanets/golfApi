import { courses, teeObject } from "src/database/db.interface";
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";
import _KeySiteId from "../common/_KeySiteId";
import _teeObject from "../zone/fairway/_teeObject";

export default class courseData implements courses {
	@ApiProperty({
		description: '球道組合代號',
	})
	@IsString()
	courseid: string;

	@ApiProperty({
		description: '球場代號',
		required: false,
	})
	@IsString()
	siteid: string;

	@ApiProperty({
		description: '球道組合名稱',
	})
	@IsString()
	courseName: string;

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
  holes: number;

	@ApiProperty({
		description: '標準桿',
	})
	@IsNumber()
  par: number;

	@ApiProperty({
		description: '難度',
		isArray: true,
		type: _teeObject,
	})
	tees: teeObject[];

	@ApiProperty({
		description: '斜度指數',
	})
	@IsNumber()
	slope?: number;

	@ApiProperty({
		description: '難度指數',
	})
	@IsNumber()
	rating?: number;

	@ApiProperty({
		description: '球道型態',
	})
	@IsString()
  courseType?:string;

	@ApiProperty({
		description: '球道設計師',
	})
	@IsString()
  courseArchitect?:string;

	@ApiProperty({
		description: '開放日期',
	})
	@IsDate()
  openDate?:string;
}