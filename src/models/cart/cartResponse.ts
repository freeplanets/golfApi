import { carts } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import cartData from "./cartData";

export default class cartResponse extends commonResponse implements commonResWithData<carts> {
	@ApiProperty({
		description: '球車資料',
		type: cartData,
	})
	data?: carts;
}