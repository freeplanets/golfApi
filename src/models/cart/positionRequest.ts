import { mapLatLong } from "../../database/db.interface";
import { positonReq } from "../if";
import { ApiProperty } from "@nestjs/swagger";

export default class positionRequest implements positonReq {
	@ApiProperty({
		description: '球車代號',
	})
	cartid: string;
	zoneid: string;
	fairwayno: number;
	position: mapLatLong;
	distance: number;
}