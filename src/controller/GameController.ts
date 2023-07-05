import { Controller, Get, Headers, Post } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { checkDataEx } from "../models/examples/game/checkInDataEx";
import checkInDataResponse from "../models/game/checkInDataResponse";

@ApiTags('Game')
@Controller('game')
export default class GameController {
	constructor(){}
	@Get('getCurCheckInData')
	@ApiHeader({name: 'www-auth'})
	@ApiOperation({description: '取得當下來賓報到資料',summary: '取得當下來賓報到資料'})
	@ApiResponse({status:200, description: '回傳當下來賓報到資料', type:checkInDataResponse})
	getCurCheckInData(@Headers('www-auth') token:string){
		console.log('getCurcheckInData', token);
		return checkDataEx.Response.value;
	}

	@Post('sideGameRegister')
	@ApiOperation({summary: '小遊戲登錄', description: '小遊戲登錄'})
	sideGameRegister(){}

	@Post('updateGamePoint')
	@ApiOperation({summary:'擊球資料輸入', description: '擊球資料輸入'})
	@ApiResponse({status:200, description:'回傳目前結果'})
	updateGamePoint(){}


	@Get('getResult/:GroupID')
	@ApiOperation({description: '結果輸出'})
	getResult(){}
}