import { ApiProperty } from "@nestjs/swagger";
import { createManager } from "../if";
import updateManagerRequest from "./updateProfileRequest";
import { UserType } from "../enum";

export default class createProfileRequest extends updateManagerRequest implements createManager {
	@ApiProperty({
		description: '球場代號',
	})
	ClubID: string;
	@ApiProperty({
		description: '密碼',
		required: true,
	})
	password: string;
	@ApiProperty({
		description:'管理人員類別',
		enum: UserType,
	})	
	userType: UserType;
}