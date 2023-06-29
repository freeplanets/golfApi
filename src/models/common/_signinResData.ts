import { ApiProperty } from "@nestjs/swagger";
import { signinResData } from "../if";
import _tokenObj from "./_tokenObj";

export default class _signinResData implements signinResData {
	@ApiProperty({
		description: '驗證權杖, 使用於  verifyHeader / verify token, used in verifyHeader',
	})
	tokens?: _tokenObj;
	@ApiProperty({
		description: '2FA尚未設定：2FA qrcode 圖 / 2FA qrcode image url',
	})
	twofaqrcode?: string;
	@ApiProperty({
		description: '2FA已設定過：需要輸入2FA驗證碼',
	})
	needfa?: boolean;
}