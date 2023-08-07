import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Condition } from "dynamoose";
import GamesService from "../../database/game/games.service";
import gameData from "../../models/game/gameData";
import { gamePartialReqEx, gameReqEx, getGamesReqEx } from "../../models/examples/game/gameDataEx";
import { gameKey, games } from "../../database/db.interface";
import { createTableData, deleteTableData, getTableData, hashKey, tokenCheck, updateTableData } from "../../function/Commands";
import gamePartialData from "../../models/game/gamePartialData";
import gameResponse from "../../models/game/gameResponse";
import commonResponse from "../../models/common/commonResponse";
import siteDateRequest from "../../models/game/siteDateRequest";
import siteDateReq, { commonResWithData } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class GameController {
	constructor(
		private readonly gamesService:GamesService,
	){}

	@Put('game')
	@ApiOperation({summary:'新增編組資料/ add game', description:'新增編組資料/ add game'})
	@ApiBody({description:'編組資料', type: gameData, examples: gameReqEx})
	@ApiResponse({status: 200})
	async add(@Body() body:games, @Headers('WWW-AUTH') token:Record<string, string>) {
		body.gameid = hashKey();
		const resp = await createTableData(String(token), this.gamesService, body);
		return resp;
	}

	@Patch('game/:gameid')
	@ApiOperation({summary:'修改編組資料/ update game', description:'修改編組資料/ update game'})
	@ApiParam({name:'gameid', description:'編組代號'})
	@ApiBody({description:'編組資料不含gameid', type: gamePartialData, examples:gamePartialReqEx})
	async update(@Param('gameid') gameid:string, @Body() body:Partial<games>, @Headers('WWW-AUTH') token:Record<string, string>){
		const keys:gameKey = {
			gameid,
		};
		if (body.gameid) delete body.gameid;
		const resp = await updateTableData(String(token), this.gamesService, body, keys);
		return resp;
	}

	@Get('game/:gameid')
	@ApiOperation({summary: '回傳指定編組資料 / get game', description: '回傳指定編組資料 / get game'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiResponse({status: 200, type: gameResponse })
	async getOne(@Param('gameid') gameid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const keys:gameKey = {
			gameid,
		};
		const resp = await getTableData(String(token), this.gamesService, keys);
		return resp;
	}

	@Delete('game/:gameid')
	@ApiOperation({summary: '刪除編組資料 / delete game', description: '刪除編組資料 / delete game'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiResponse({status: 200, type: commonResponse})
	async delete(@Param('gameid') gameid:string, @Headers('WWW-AUTH') token:Record<string, string>) {
		const keys:gameKey = {
			gameid,
		};		
		const resp = await deleteTableData(String(token), this.gamesService, keys);
		return resp;
	}

	@Post('game')
	@ApiOperation({summary: '查詢某球場某日全部編組資料 / query games via siteid and date', description: '查詢某球場某日全部編組資料 / query games via siteid and date'})
	@ApiBody({description: '查詢參數', type: siteDateRequest, examples: getGamesReqEx})
	async query(@Body() body:siteDateReq, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.queryGamesByDate(String(token), body);
		return resp;
	}

	async queryGamesByDate(token:string, siteDate:siteDateReq):Promise<commonResWithData<games[]>> {
		let resp:commonResWithData<games[]> = {
			errcode: '0',		
		}		
		const user = tokenCheck(token);
		if (user) {
			let missKey = '';
			if (!siteDate.siteid) missKey = 'siteid';
			if (!siteDate.queryDate) missKey = 'queryDate';
			if (missKey) {
				resp.errcode = ErrCode.MISS_PARAMETER;
				resp.error = {
					message: errorMsg('MISS_PARAMETER', missKey),
				}				
			} else {
				const startTime = new Date(`${siteDate.queryDate} 00:00:00`).getTime()/1000;
				const endTime = new Date(`${siteDate.queryDate} 23:59:59`).getTime()/1000;
				console.log('queryGame', siteDate, startTime, endTime);
				const cond = new Condition({siteid: siteDate.siteid}).where('esttimatedStartTime').between(startTime, endTime);
				resp.data = await this.gamesService.queryWithCondition(cond);
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}		
		}
		return resp;
	}
}