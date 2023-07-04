import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import commonResponse from "../models/common/commonResponse";
import { commonResEx } from "../models/examples/commonResponseEx";
import { InDataTw01 } from "../models/indata/TW01/ifInData";
import { inDataEx } from "../models/indata/TW01/inDataExample";
import inDataRequest from "../models/indata/TW01/inDataRequest";

@ApiTags('InData')
@Controller('indata')
export default class InDataController {
	constructor() {}
	@Post('/:ClubID')
	@ApiBody({description:'球場傳入來賓進場資料', type: inDataRequest, examples: inDataEx})
	@ApiResponse({status: 200, description:'球場傳入來賓進場資料回傳物件', type: commonResponse})
	saveData(@Body() body:InDataTw01,@Param('ClubID') clubid:string){
		console.log(clubid, body);
		return commonResEx.Response.value;
	}
}