import { Body, Controller, Headers, Param, Post } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import ksGameRequest from "../../models/transData/ks/request/ksGameRequest";
import { ksGameReqEx } from "../../models/transData/ks/request/ksGameReqEx";
import { ksGameNew, ksGameReq } from "../../models/transData/ks/ks.interface";
import ksGamesResponse from "../../models/transData/ks/response/ksGamesResponse";
import ZonesService from "../../database/zone/zones.service";
import CoursesService from "../../database/course/courses.service";
import GamesService from "../../database/game/games.service";
import { Condition } from "dynamoose";
import { player, playerDefault, score } from "../../database/db.interface";
import gameData from "../../models/game/gameData";
import { hashKey } from "../../function/Commands";
import _playerObject from "../../models/game/_playerObject";
import { commonRes } from "../../models/if";
import EncDecString from "../../function/EncDecString";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import { gameStatus } from "../../models/enum";
import ksGameNewReq from "../../models/transData/ks/request/ksGameNewReq";
import { ksGameEx } from "../../models/transData/ks/request/ksGameNewEx";
import MyDate from "../../class/common/MyDate";
import PlayerResultService from "../../database/playerResult/playerResult.service";

@ApiTags('Api')
@Controller('ksapi')
export default class DataTransController {
	constructor(
		private readonly zonesService:ZonesService,
		private readonly coursesService:CoursesService,
		private readonly gamesService:GamesService,
		private readonly playerResultService:PlayerResultService, 
		) {}
		
	@Post('assign')
	@ApiOperation({summary:'接收國興客戶資料', description:'接收國興客戶資料 API / acceptDataFromKS'})
	@ApiHeader({name: 'X-Api-Key', description: 'Api key'})
	@ApiBody({description:'國興傳入來賓進場資料', type: ksGameNewReq, examples: ksGameEx})	
	async assign(@Body() body:ksGameNew, @Headers('X-Api-Key') apiKey:string){
		console.log('apikey:', apiKey);
		console.log('body:', body);
		const resp:commonRes = {
			errcode: ErrCode.OK,
		}
		const eds:EncDecString = new EncDecString(process.env.);
		const { siteid } = JSON.parse(eds.Decrypted(apiKey));
		if (siteid) {
			//try {
				await this.assignGame(siteid, body);
			// } catch(e) {
			// 	resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			// 	resp.error = {
			// 		message: errorMsg('DATABASE_ACCESS_ERROR'),
			// 		extra: e,
			// 	}
			// }
		} else {
			resp.errcode = ErrCode.MISS_PARAMETER
			resp.error = {
				message: errorMsg('MISS_PARAMETER', 'X-Api-Key'),
			}			
		}	
		return resp;
	}

	@Post('game')
	@ApiOperation({summary:'接收球場客戶資料', description:'接收球場客戶資料 API / acceptDataFromKS'})
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
		// console.log('body', body);
		//console.log('siteid:', siteid, process.env.);
		const eds:EncDecString = new EncDecString(process.env.API_KEY);
		const { siteid } = JSON.parse(eds.Decrypted(apiKey));
		// console.log('siteid:', siteid, apiKey);
		if (siteid) {
			try {
				// console.log('createGames start:', new Date().getTime());
				await this.createGames(siteid, body);
				// console.log('createGames end:', new Date().getTime());
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

	@Post('result/:date')
	@ApiOperation({summary:'傳送成績給國興系統', description:'傳送成績給國興系統'})
	@ApiParam({name: 'date', description:'日期 (Y-m-d)'})
	@ApiResponse({status: 200, type: ksGamesResponse})
	async getResult(@Param('date') date:string, @Headers('X-Api-Key') apiKey:string){
		console.log('date:', date, ' apiKey:', apiKey);
		const ans = {
			success:true,
			v:"1.3",
			code:1000,
			message:"Success, Access Type : JSON.",
			data: null			
		}
		const eds:EncDecString = new EncDecString(process.env.API_KEY);
		const { siteid } = JSON.parse(eds.Decrypted(apiKey));
		// console.log('siteid:', siteid, apiKey);
		if (siteid) {
			try {
				ans.data = await this.queryPlayerResult(siteid, date);
			} catch(e) {
				ans.success = false;
				ans.message = 'Error!';
				ans.message = e
			}
		} else {
			ans.success = false;
			ans.message = 'X-Api-Key error';
		}
		return ans;
	}

	async assignGame(siteid:string, data:ksGameNew):Promise<any>{
		const checkGameExists = await this.gamesService.query({siteid, refKey: data.key}, ['gameid']);
		console.log('checkGameExists', checkGameExists);
		if (checkGameExists.count > 0) {
			const gameid = checkGameExists[0].gameid;
			await this.gamesService.delete({gameid});
		}
		console.log('assignGame', data, checkGameExists.count);
		const subCond = new Condition('refKey.KS').in(data.areas);
		const cond = new Condition('siteid').eq(siteid).parenthesis(subCond);
		const ans = await this.zonesService.query(cond);
		console.log('zoneService', ans);
		if (ans.count>0) {
			const zoneids: string[] = [];
			ans.forEach((itm) => {
				// console.log('itm:',itm);
				// zoneids[itm.refNo] = itm.zoneid;
				zoneids.push(itm.zoneid);
			});
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
			if (ans[0].refKey.KS === data.areas[0]) {
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
			game.caddies = [
				{caddieid: `caddie${this.add0(data.caddie[0])}`, caddieName:`caddie${this.add0(data.caddie[0])}`}
			];
			if (data.caddie[1]) {
				game.caddies.push(
					{caddieid: `caddie${this.add0(data.caddie[1])}`, caddieName:`caddie${this.add0(data.caddie[1])}`}
				);
			}
			game.siteid = siteid;
			game.refKey = data.key;
			game.extra = {
				group_no: data.group_no,
				caddie: data.caddie,
			}
			if (data.team) {
				game.extra.team = data.team;
				game.extra.team_id = data.team_id;
			}
			game.courseid = course.courseid;
			game.outZone = course.outZone;
			game.inZone = course.inZone;
			game.stepInZone = course.outZone;
			game.stepInFairway = 1;
			game.par = course.par;
			game.slope = course.slope | 0;
			game.rating = course.rating | 0;
			game.esttimatedStartTime = MyDate.getTime();
			game.startTime = 0;
			game.endTime = 0;
			if (data.team) {
				game.gameTitle = data.team;
			}
			game.status = gameStatus.WaitForCart;
			game.playerDefaults = [];
			game.players = data.player.map((itm, idx) => {
				console.log('player:', itm);
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
				const ctee = course.tees.find((t) => t.teeColor === 'White');
				const tmp:player = {
					playerName: itm,
					tee: ctee,
					hcp: '0',
					playerOrder: idx,
					gross: 0,
					holes,
					frontGross: 0,
					backGross: 0,
					parDiff: 0,
					stablefordPoint: 0,
					extra: {
						player_id: data.player_id[idx],
						memberId: data.player_id[idx],
						checkInId: data.group_no,
					},
				};
				const pDef:playerDefault = {
					playerName: itm,
					fullHcp: '0',
					allowance: '100',
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
			let cond = new Condition().where('outZone').eq(zoneids[0]).and().where('inZone').eq(zoneids[1]);
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
			game.stepInZone = course.outZone;
			game.stepInFairway = 1;
			game.par = course.par;
			game.slope = course.slope | 0;
			game.rating = course.rating | 0;
			//game.esttimatedStartTime = data.teeOffTimestamp < 9999999999 ? data.teeOffTimestamp * 1000 : data.teeOffTimestamp;
			game.esttimatedStartTime = MyDate.getTime();
			game.startTime = 0;
			game.endTime = 0;
			if (data.event && data.event.name) {
				game.gameTitle = data.event.name;
			}
			game.status = gameStatus.WaitForCart;
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
					fullHcp: '0',
					allowance: '100',
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
	async queryPlayerResult(siteid:string, date:string):Promise<any> {
		const startTime = MyDate.getTime(`${date} 00:00:00`);
		const endTime = MyDate.getTime(`${date} 23:59:59`);
		const cond = new Condition({siteid}).where('esttimatedStartTime').between(startTime, endTime);
		// resp.data = await this.gamesService.query(cond);
		const prs = await this.playerResultService.query(cond, ['playerScoreKS']);
		if (prs.count > 0) {
			return prs.map((pr) => pr.playerScoreKS);
		}
		return [];
	}		
}