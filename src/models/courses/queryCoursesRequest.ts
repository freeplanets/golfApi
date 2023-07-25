import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { courses } from "../../database/db.interface";
import { IsString } from "class-validator";

export default class queryCoursesRequest implements Partial<courses> {
	@ApiProperty({
		description: '球場代號',
		required: false,
	})
	@IsString()
	siteid?: string;

	@ApiProperty({
		description: '球場組合名稱',
		required: false,
	})
	@IsString()	
	courseName?: string;
}