import { ApiProperty } from "@nestjs/swagger";
import { timeSection } from "../if";
import { IsString } from "class-validator";

export default class _timeSection implements timeSection {
	@ApiProperty({
		description: '開始時間 08:00/24小時制',
	})
	@IsString()
	start: string;
	@ApiProperty({
		description: '結束時間 08:00/24小時制',
	})
	@IsString()	
	end: string;
}