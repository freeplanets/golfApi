import { carts, games, zones } from "../../database/db.interface";
import { checkInRes } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import gameData from "./gameData";
import zonesData from "../zone/zonesData";
import cartData from "../cart/cartData";

export default class checkInResData implements checkInRes {
	@ApiProperty({
		description: '來賓編組資料',
		type: gameData,
	})
	game: games;

	@ApiProperty({
		description: '分區資料',
		isArray: true,
		type: zonesData,
	})
	zones: zones[];

	@ApiProperty({
		description: '球車資料',
		type: cartData,
	})
	cart: carts;
}