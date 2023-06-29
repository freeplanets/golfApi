import { ApiProperty } from "@nestjs/swagger";
import { reToken } from "../if";

export default class refreshTokenRequest implements reToken {
	@ApiProperty({
		description: 'refresh token',
	})
	refreshToken: string;
}