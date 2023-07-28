import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import commonResponse from "../../models/common/commonResponse";
import { commonResEx } from "../../models/examples/commonResponseEx";
import ksGameRequest from "../../models/transData/ks/request/ksGameRequest";
import { ksGameReqEx } from "../../models/transData/ks/request/ksGameReqEx";
import { ksGameReq } from "../../models/transData/ks/ks.interface";
import ksGamesResponse from "../../models/transData/ks/response/ksGamesResponse";
import ZonesService from "../../database/zone/zones.service";
import CoursesService from "../../database/course/courses.service";
import GamesService from "../../database/game/games.service";
// import { courses } from "src/database/db.interface";
import { Condition } from "dynamoose";
import { courses, player } from "src/database/db.interface";
import gameData from "src/models/game/gameData";
import { hashKey } from "src/function/Commands";
import _playerObject from "src/models/game/_playerObject";

@ApiTags('Api')
@Controller('ksapi')
export default class DataTransController {
	constructor(
		private readonly zonesService:ZonesService,
		private readonly coursesService:CoursesService,
		private readonly gamesService:GamesService) {}
	@Post('game')
	@ApiOperation({summary:'接收球場客戶資料(working.....)', description:'接收球場客戶資料 API / acceptDataFromMain'})
	@ApiBody({description:'球場傳入來賓進場資料', type: ksGameRequest, examples: ksGameReqEx})
	@ApiResponse({status: 200, description:'球場傳入來賓進場資料回傳物件', type: commonResponse})
	async saveData(@Body() body:ksGameReq){
		const siteid = 'linkougolf';
		console.log( body);
		const ans = await this.createGames(siteid, body);
		console.log('ans:', ans);
		return commonResEx.Response.value;
	}

	@Post('result/:start/:end')
	@ApiOperation({summary:'傳送成績給國興系統(working.....)', description:'傳送成績給國興系統'})
	@ApiParam({name: 'start', description:'開始時間'})
	@ApiParam({name: 'end', description:'結束時間'})
	@ApiResponse({status: 200, type: ksGamesResponse})
	getResult(@Param('start') start:string, @Param('end') end:string){
		console.log('ksapi/result', start, end);
		return commonResEx.Response.value;	
	}
	
	async createGames(siteid:string, data:ksGameReq){
		const zones:number[] = [data.zones[0].number];
		if (data.zones[1] && data.zones[1].number !== undefined) {
			zones.push(data.zones[1].number);
		}
		const subCond = new Condition('refNo').in(zones);
		const cond = new Condition('siteid').eq(siteid).parenthesis(subCond);
		const ans = await this.zonesService.queryWithCondition(cond);
		console.log(ans);	
		if (ans.count>0) {
			const zoneids: string[] = [];
			ans.forEach((itm) => {
				console.log('itm:',itm);
				zoneids[itm.refNo] = itm.zoneid;
			});
			console.log(zoneids);
			const searchCourseKey:Partial<courses> = {
				outZone: zoneids[zones[0]],
			}
			if (zones[1] !== undefined) {
				searchCourseKey.inZone = zoneids[zones[1]];
			}
			console.log(searchCourseKey);
			const ans1 = await this.coursesService.query(searchCourseKey)
			// return ans1;
			const course = ans1[0];
			const game = new gameData();
			game.gameid = hashKey();
			game.caddies = [ {caddieid: `caddie${data.caddie.number}`} ];
			if (data.caddie2) {
				game.caddies.push({caddieid: `caddie${data.caddie2.number}`});
			}
			game.siteid = siteid;
			game.courseid = course.courseid;
			game.outZone = course.outZone;
			game.inZone = course.inZone;
			game.stepInZone = '';
			game.stepInFairway = 1;
			game.par = course.par;
			game.slope = course.slope | 0;
			game.rating = course.rating | 0;
			game.esttimatedStartTime = data.teeOffTimestamp;
			game.startTime = 0;
			game.endTime = 0;
			const players = data.players.map((itm, idx) => {
				const tmp:player = {
					playerName: itm.name,
					tee: itm.tee.name,
					hcp: '0',
					playerOrder: idx,
					gross: 0,
					holes: []
				}
			})
		}
		return ans;
	}
}