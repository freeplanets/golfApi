import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import commonResponse from "../../models/common/commonResponse";
import { commonResEx } from "../../models/examples/commonResponseEx";
import ksGameRequest from "../../models/transData/ks/request/ksGameRequest";
import { ksGameReqEx } from "../../models/transData/ks/request/ksGameReqEx";
import { ksGameReq } from "src/models/transData/ks/ks.interface";

@ApiTags('Api')
@Controller('ksapi')
export default class DataTransController {
	constructor() {}
	@Post('game')
	@ApiOperation({summary:'接收球場客戶資料(working.....)', description:'接收球場客戶資料 API / acceptDataFromMain'})
	@ApiBody({description:'球場傳入來賓進場資料', type: ksGameRequest, examples: ksGameReqEx})
	@ApiResponse({status: 200, description:'球場傳入來賓進場資料回傳物件', type: commonResponse})
	saveData(@Body() body:ksGameReq,@Param('ClubID') siteid:string){
		console.log(siteid, body);
		return commonResEx.Response.value;
	}

	@Post('result/:start/:end')
	@ApiOperation({summary:'傳送成績給國興系統(working.....)', description:'傳送成績給國興系統'})
	@ApiParam({name: 'start', description:'開始時間'})
	@ApiParam({name: 'end', description:'結束時間'})
	getResult(@Param('start') start:string, @Param('end') end:string){
		console.log('ksapi/result', start, end);
		return commonResEx.Response.value;	
	}
}