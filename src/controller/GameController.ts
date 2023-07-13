import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiParamOptions, ApiHeader } from "@nestjs/swagger";
import { checkDataEx, partialResultEx, sideGameRegEx, swingResultEx } from "../models/examples/game/checkInDataEx";
import checkInDataResponse from "../models/game/checkInDataResponse";
import _sideGameData from "../models/common/_sideGameData";
import commonResponse from "../models/common/commonResponse";
import { sideGamesData, swingResult } from "../models/if";
import { commonResEx } from "../models/examples/commonResponseEx";
import _swingResult from "../models/common/_swingResult";
import swingResultResponse from "../models/game/swingResultResponse";
import { ReportType } from "../models/enum";
import getResultResponse from "../models/game/getResultResponse";

@ApiBearerAuth()
@ApiHeader({name: 'www-auth', required:false})
@ApiTags('Game')
@Controller('game')
export default class GameController {
	constructor(){}
	@Get('getCurCheckInData')
	@ApiOperation({description: '取得當下來賓報到資料',summary: '取得當下來賓報到資料'})
	@ApiResponse({status:200, description: '回傳當下來賓報到資料', type:checkInDataResponse})
	getCurCheckInData(){
		const token = Headers('www-auth');
		console.log('getCurcheckInData', token, checkDataEx.Response.value);
		// res.setHeader('www-auth', token);
		//res.status(200).json(checkDataEx.Response.value);
		console.log(checkDataEx.Response.value);
		return checkDataEx.Response.value;
	}

	@Post('sideGameRegister')
	@ApiOperation({summary: '小遊戲登錄', description: '小遊戲登錄'})
	@ApiBody({description: '小遊戲登錄', type:_sideGameData, examples: sideGameRegEx })
	@ApiResponse({status: 200, description: '小遊戲登錄回傳物件', type: commonResponse})
	sideGameRegister(@Body() body:sideGamesData){
		const token = Headers('www-auth');
		console.log('sideGameRegister', body, token)
		return commonResEx.Response.value;
	}

	@Post('updateGamePoint')
	@ApiOperation({summary:'擊球資料輸入', description: '擊球資料輸入'})
	@ApiBody({description: '', type: _swingResult, examples: swingResultEx})
	@ApiResponse({status:200, description:'回傳目前結果', type:swingResultResponse})
	updateGamePoint(@Body() body:swingResult){
		const token = Headers('www-auth');
		console.log('updateGamePoint', body, token)
		return partialResultEx.Response.value;
	}


	@Get('getResult/:GroupID/:ReportType')
	@ApiOperation({summary: '結果輸出', description: '結果輸出'})
	@ApiParam({name: 'GroupID', description:'組別編號', type: 'string'})
	@ApiParam({name: 'ReportType', description: '報表型式', enum: ReportType})
	getResult(@Param('GroupID') groupid:string, @Param('ReportType') reportType:ReportType){
		const token = Headers('www-auth');
		console.log('sideGameRegister', groupid, reportType, token);
		let rpt: any;
		switch(reportType) {
			case ReportType.URL:
				rpt = 'https://someurl';
				break;
			case ReportType.JSON:
				rpt = {};
		}
		const res = new getResultResponse();
		res.data = rpt;
		return res.data;
	}
}