import { ApiProperty } from "@nestjs/swagger";
import commonResponse from "./commonResponse";

export default class responseWithData<T> extends commonResponse {
	@ApiProperty({
		description: '自定物件',
		type: Object,
	})
	data?: T;
}