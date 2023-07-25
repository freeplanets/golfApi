import { ApiProperty } from "@nestjs/swagger";
import { commonResWithData } from "../../if";
import { fairwayObject } from "../../../database/db.interface";
import commonResponse from "../../common/commonResponse";
import fairwayInfoRequest from "./_fairwayObject";

export default class fairwayInfoResponse extends commonResponse implements commonResWithData<fairwayObject[]> {
	@ApiProperty({
		description: '回傳球道資料列表',
		isArray: true,
		type: fairwayInfoRequest,
	})
	data?: fairwayObject[];
}