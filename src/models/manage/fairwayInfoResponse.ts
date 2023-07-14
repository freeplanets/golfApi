import { ApiProperty } from "@nestjs/swagger";
import { commonResWithData } from "../if";
import { fairwayInfo } from "../../database/db.interface";
import commonResponse from "../common/commonResponse";
import fairwayInfoRequest from "./fairwayInfoRequest";

export default class fairwayInfoResponse extends commonResponse implements commonResWithData<fairwayInfo[]> {
	@ApiProperty({
		description: '回傳球道資料列表',
		isArray: true,
		type: fairwayInfoRequest,
	})
	data?: fairwayInfo[];
}