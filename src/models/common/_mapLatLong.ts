import { ApiProperty } from "@nestjs/swagger";
import { mapLatLong } from "../if";
import { IsLatLong, IsLongitude, IsNumber } from "class-validator";

export default class _mapLatLong implements mapLatLong {
	@ApiProperty({
		description: '經度',
	})
	@IsNumber()
	@IsLongitude()
	longitude: number;
	@ApiProperty({
		description: '緯度',
	})
	@IsNumber()
	@IsLatLong()
	latitude: number;
}