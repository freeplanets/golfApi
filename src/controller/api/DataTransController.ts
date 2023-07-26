import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import commonResponse from "../../models/common/commonResponse";
import { commonResEx } from "../../models/examples/commonResponseEx";
import { checkinLinkouGolf } from "../../models/indata/linkouGolf/checkin.interface";
import { inDataEx } from "../../models/indata/linkouGolf/inDataExample";
import inDataRequest from "../../models/indata/linkouGolf/inDataRequest";

@ApiTags('Api')
@Controller('api')
export default class InDataController {
	constructor() {}
	@Post('ksapi/game')
	@ApiOperation({summary:'接收球場客戶資料 API / acceptDataFromMain', description:'接收球場客戶資料 API / acceptDataFromMain'})
	@ApiBody({description:'球場傳入來賓進場資料', type: inDataRequest, examples: inDataEx})
	@ApiResponse({status: 200, description:'球場傳入來賓進場資料回傳物件', type: commonResponse})
	saveData(@Body() body:checkinLinkouGolf,@Param('ClubID') siteid:string){
		console.log(siteid, body);
		return commonResEx.Response.value;
	}
}