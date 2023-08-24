import { Body, Controller, Headers, Param, Post } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
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
import { player, playerDefault, score } from "../../database/db.interface";
import gameData from "../../models/game/gameData";
import { hashKey } from "../../function/Commands";
import _playerObject from "../../models/game/_playerObject";
import { commonRes } from "../../models/if";
import { HcpType } from "../../models/enum";
import EncDecString from "../../function/EncDecString";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";

@ApiTags('Api')
@Controller('ksapi')
export default class DataTransController {
	constructor(
		private readonly zonesService:ZonesService,
		private readonly coursesService:CoursesService,
		private readonly gamesService:GamesService) {}
	@Post('game')
	@ApiOperation({summary:'接收球場客戶資料', description:'接收球場客戶資料 API / acceptDataFromMain'})
	@ApiHeader({name: 'X-Api-Key', description: 'Api key'})
	@ApiBody({description:'球場傳入來賓進場資料', type: ksGameRequest, examples: ksGameReqEx})
	// @ApiResponse({status: 200, description:'球場傳入來賓進場資料回傳物件', type: commonResponse})
	// @HttpCode(204)
	async saveData(@Body() body:ksGameReq, @Headers('X-Api-Key') apiKey:string){
		// const siteid = 'linkougolf';
		// console.log( body);
		const resp:commonRes = {
			errcode: ErrCode.OK,
		}
		console.log('body', body);
		//console.log('siteid:', siteid, process.env.API_KEY);
		const eds:EncDecString = new EncDecString(process.env.API_KEY);
		const { siteid } = JSON.parse(eds.Decrypted(apiKey));
		console.log('siteid:', siteid, apiKey);
		if (siteid) {
			try {
				console.log('createGames start:', new Date().getTime());
				await this.createGames(siteid, body);
				console.log('createGames end:', new Date().getTime());
				return;
			} catch (e) {
				resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
				resp.error = {
					message: errorMsg('DATABASE_ACCESS_ERROR'),
					extra: e,
				}				
			}
		} else {
			resp.errcode = ErrCode.MISS_PARAMETER
			resp.error = {
				message: errorMsg('MISS_PARAMETER', 'X-Api-Key'),
			}
		}
		return resp;
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
	
	async createGames(siteid:string, data:ksGameReq):Promise<any>{
		const zones:number[] = [data.zones[0].number];
		if (data.zones[1] && data.zones[1].number !== undefined) {
			zones.push(data.zones[1].number);
		}
		const subCond = new Condition('refNo').in(zones);
		const cond = new Condition('siteid').eq(siteid).parenthesis(subCond);
		const ans = await this.zonesService.query(cond);
		if (ans.count>0) {
			const zoneids: string[] = [];
			ans.forEach((itm) => {
				// console.log('itm:',itm);
				// zoneids[itm.refNo] = itm.zoneid;
				zoneids.push(itm.zoneid);
			});
			// console.log(zoneids);
			/*
			const searchCourseKey:Partial<courses> = {
				outZone: zoneids[zones[0]],
			}
			if (zones[1] !== undefined) {
				searchCourseKey.inZone = zoneids[zones[1]];
			}
			*/

			let cond = new Condition().where('outZone').eq(zoneids[0]).and().where('inZone').eq(zoneids[1]);
			//cond.or().parenthesis((condition) => condition.where('outZone').eq(zoneids[1]).and().where('inZone').eq(zoneids[0]));
			//.or().where('outZone').eq(zoneids[1]).and().where('inZone').eq(zoneids[0]);
			let ans1 = await this.coursesService.query(cond);
			if (ans1.count === 0) {
				cond = new Condition().where('outZone').eq(zoneids[1]).and().where('inZone').eq(zoneids[0]); 
				ans1 = await this.coursesService.query(cond);
			}
			console.log('after course check', ans1.count);
			// return ans1;
			const course = ans1[0];
			console.log('course:', course);
			const zone = [];
			if (ans[0].refNo === data.zones[0].number) {
				zone.push(ans[0]);
				if (ans[1]) {
					zone.push(ans[1]);
				}
			} else {
				zone.push(ans[1]);
				zone.push(ans[0]);
			}
			const game = new gameData();
			game.gameid = hashKey();
			game.caddies = [ {caddieid: `caddie${this.add0(data.caddie.number)}`, caddieName:`caddie${this.add0(data.caddie.number)}`} ];
			if (data.caddie2) {
				game.caddies.push({caddieid: `caddie${this.add0(data.caddie2.number)}`, caddieName:`caddie${this.add0(data.caddie2.number)}`});
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
			game.esttimatedStartTime = data.teeOffTimestamp < 9999999999 ? data.teeOffTimestamp * 1000 : data.teeOffTimestamp;
			game.startTime = 0;
			game.endTime = 0;
			game.playerDefaults = [];
			game.players = data.players.map((itm, idx) => {
				let holes:score[] = [];
				let no = 0;
				zone.forEach((z) => {
					z.fairways.forEach((f) => {
						no+=1;
						const sco:score = {
							zoneid: z.zoneid,
							fairwayno: f.fairwayno,
							handicap: f.handicap,
							par: f.par,
							holeNo: no,
							gross: 0,
							parDiff: 0,
						};
						holes.push(sco);
					})
				});
				const ctee = course.tees.find((t) => t.teeColor === itm.tee.name);
				console.log('ctee', itm.tee.name, ctee);
				const tmp:player = {
					playerName: itm.name,
					tee: ctee,
					hcp: '0',
					playerOrder: idx,
					gross: 0,
					holes,
					frontGross: 0,
					backGross: 0,
					parDiff: 0,
					stablefordPoint: 0,
					extra: itm.extra,
				};
				const pDef:playerDefault = {
					playerName: itm.name,
					fullHcp: HcpType.NoHcp,
					allowance: 1,
					hcp: '0',
					hcpRound: true,
				}
				game.playerDefaults.push(pDef);
				return tmp;
			});
			await this.gamesService.create(game);
		}
		return;
	}
	add0(str:string){
		while(str.length<3) {
			str = '0' + str;
		}
		return str
	}
}