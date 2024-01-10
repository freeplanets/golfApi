import { courses } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import courseData from "./courseData";

export default class courseResponse extends commonResponse implements commonResWithData<courses> {
	@ApiProperty({
		description: '球道組合',
		type: courseData,
	})
	data?: courses;
}