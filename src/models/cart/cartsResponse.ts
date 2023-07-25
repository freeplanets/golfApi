import { carts } from "src/database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import cartData from "./cartData";

export default class cartsResponse extends commonResponse implements commonResWithData<carts[]> {
	@ApiProperty({
		description: '球車資料',
		isArray:true,
		type:cartData,
	})
	data?: carts[];
}