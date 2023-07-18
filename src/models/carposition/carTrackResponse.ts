import { carPositionHistory } from "src/database/db.interface";
import commonResponse from "../common/commonResponse";
import { commonResWithData } from "../if";
import { ApiProperty } from "@nestjs/swagger";
import carPositionHistoryData from "./carPositionHistoryData";

export default class carTrackResponse extends commonResponse implements commonResWithData<carPositionHistory[]> {
	@ApiProperty({
		description: '球車軌跡',
		isArray: true,
		type: carPositionHistoryData,
	})
  data?: carPositionHistory[];
}