import { ApiProperty } from "@nestjs/swagger";
import { playerDefault } from "../../database/db.interface";

export default class _playerDefault implements playerDefault {
	@ApiProperty({
		description: '來賓名稱',
	})
	playerName: string;

	@ApiProperty({
		description: 'T台',
		required: false,
	})
	tee?: string;

	@ApiProperty({
		description: '差點/copy from Games(Hcp)',
	})
	fullHcp: string;

	@ApiProperty({
		description: '採用比率/ default 100%',
	})
	allowance: string;

	@ApiProperty({
		description: '採用差點/ fullHcp * percent(playing Hcp)',
	})
	hcp: string;

	@ApiProperty({
		description: 'Hcp round',
		default: false,
	})
	hcpRound: boolean;
}