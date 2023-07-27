import { ApiProperty } from "@nestjs/swagger";
import { ksEvent } from "../ks.interface";

export default class _ksEventObject implements ksEvent {
	@ApiProperty({
		description: '賽事',
	})
	name: string;
}