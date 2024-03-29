import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put, Response } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Condition } from "dynamoose";
import GamesService from "../../database/game/games.service";
import gameData from "../../models/game/gameData";
import { assignCartEx, gamePartialReqEx, gameReqEx, getGamesReqEx } from "../../models/examples/game/gameDataEx";
import { carts, gameKey, games, player, teeObject, score, platformUser } from "../../database/db.interface";
import { createTableData, deleteTableData, getTableData, hashKey, removeUnderLineData, tokenCheck, updateTableData } from "../../function/Commands";
import gamePartialData from "../../models/game/gamePartialData";
import gameResponse from "../../models/game/gameResponse";
import commonResponse from "../../models/common/commonResponse";
import siteDateRequest from "../../models/game/siteDateRequest";
import  { commonResWithData, siteDateReq, gamesInfo, AnyObject, gameResultGroup, gameResultPlayer } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import assignCartRequest from "../../models/game/assignCartRequest";
import CartsService from "../../database/cart/carts.service";
import { CartStatus, DeviceStatus } from "../../function/func.interface";
import ZonesService from "../../database/zone/zones.service";
import CoursesService from "../../database/course/courses.service";
import gamesInfoResponse from "../../models/game/gamesInfoResponse";
import { gameStatus } from "../../models/enum";
import MyDate from "../../class/common/MyDate";
import DevicesService from "../../database/device/devices.service";
import gameResultRequest from "../../models/game/gameResultRequest";
import { gameRequestReqEx } from "../../models/examples/game/gameResult";
import PlayerResultService from "../../database/playerResult/playerResult.service";


@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class GameController {
	constructor(
		private readonly gamesService:GamesService,
		private readonly cartsService:CartsService,
		private readonly zonesService:ZonesService,
		private readonly coursesService:CoursesService,
		private readonly devicesService:DevicesService,
		private readonly playerResultService:PlayerResultService,
	){}

	@Put('game')
	@ApiOperation({summary:'新增編組資料/ add game', description:'新增編組資料/ add game'})
	@ApiBody({description:'編組資料', type: gameData, examples: gameReqEx})
	@ApiResponse({status: 200})
	async add(@Body() body:games, @Response({passthrough:true}) res:any) {
		// body.gameid = hashKey();
		body = await this.gameDataCheck(body);
		const user = res.locals.user as platformUser;
		const resp = await createTableData(user, this.gamesService, body);
		return resp;
	}

	@Patch('game/:gameid')
	@ApiOperation({summary:'修改編組資料/ update game', description:'修改編組資料/ update game'})
	@ApiParam({name:'gameid', description:'編組代號'})
	@ApiBody({description:'編組資料不含gameid', type: gamePartialData, examples:gamePartialReqEx})
	async update(@Param('gameid') gameid:string, @Body() body:games, @Response({passthrough:true}) res:any){
		const keys:gameKey = {
			gameid,
		};
		body = await this.gameDataCheck(body);
		if (body.gameid) delete body.gameid;
		const user = res.locals.user as platformUser;
		const resp = await updateTableData<games, gameKey>(user, this.gamesService, body, keys);
		return resp;
	}

	@Get('game/:gameid')
	@ApiOperation({summary: '回傳指定編組資料 / get game', description: '回傳指定編組資料 / get game'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiResponse({status: 200, type: gameResponse })
	async getOne(@Param('gameid') gameid:string,@Response({passthrough:true}) res:any){
		const keys:gameKey = {
			gameid,
		};
		const resp = await getTableData<games, gameKey>(res.locals.user, this.gamesService, keys);
		return resp;
	}

	@Delete('game/:gameid')
	@ApiOperation({summary: '刪除編組資料 / delete game', description: '刪除編組資料 / delete game'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiResponse({status: 200, type: commonResponse})
	async delete(@Param('gameid') gameid:string, @Response({passthrough:true}) res:any) {
		const keys:gameKey = {
			gameid,
		};		
		const resp = await deleteTableData(res.locals.user, this.gamesService, keys);
		return resp;
	}

	@Post('game')
	@ApiOperation({summary: '查詢某球場某日全部編組資料 / query games via siteid and date', description: '查詢某球場某日全部編組資料 / query games via siteid and date'})
	@ApiBody({description: '查詢參數', type: siteDateRequest, examples: getGamesReqEx})
	async query(@Body() body:siteDateReq, @Headers('WWW-AUTH') token:Record<string, string>){
		// console.log('query game', token);
		const resp = await this.queryGamesByDate(String(token), body);
		return resp;
	}
	@Post('gameResult')
	@ApiOperation({summary: '成績查詢', description: '成績查詢'})
	@ApiBody({description: '查詢參數', type: gameResultRequest, examples: gameRequestReqEx})
	async GameResult(@Body() body:gameResultRequest, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.queryGameResult(String(token), body);
		return resp;
	}

	@Post('assignCart/:gameid')
	@ApiOperation({summary: '指派球車/ assign cart for game', description: '指派球車/ assign cart for game'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiBody({description: '球車代號', type: assignCartRequest, examples: assignCartEx})
	async assignCart(@Param('gameid') gameid:string, @Body() body:Partial<games>, @Response({passthrough:true}) res:any){
		const resp = await updateTableData(res.locals.user, this.gamesService, body, {gameid} as gameKey);
		if (resp.errcode === ErrCode.OK) {
			const service = this.cartsService;
			body.carts.forEach(async (cartid) => {
				const cartData:Partial<carts> = {
					status: CartStatus.onduty,
				}
				await service.update({ cartid }, cartData);
			})
		}		
		return resp;
	}
	@Get('gamesInfo')
	@ApiOperation({summary: '本日派組資訊', description: '本日派組資訊'})
	@ApiResponse({status: 200, type: gamesInfoResponse})
	async gaemsInfo(@Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<gamesInfo> = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(String(token));
		if (user) {
			const data:gamesInfo = {
				waitForCart: 0,
				onGame: 0,
				ended: 0,
				total: 0,
			}
			const today = new Date().toDateString();
			const startTime = new Date(`${today} 00:00:00`).getTime();
			const cond = new Condition({siteid: user.siteid}).where('esttimatedStartTime').gt(startTime);
			const games = await this.gamesService.query(cond, ['carts', 'startTime', 'endTime']);
			data.total = games.count;
			games.forEach((g) => {
				if (!g.carts || g.carts.length ===0) {
					data.waitForCart += 1;
				}
				if (g.endTime) {
					data.ended += 1;
				} else {
					if (g.startTime) data.onGame += 1;
				}
			});
			resp.data = data;
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
				extra: {token}
			}		
		}
		return resp;		
	}

	async queryGamesByDate(token:string, siteDate:siteDateReq):Promise<commonResWithData<games[]>> {
		let resp:commonResWithData<games[]> = {
			errcode: ErrCode.OK,		
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
				/*
				const timegap = 2*60*60*1000;
				const startTime = new Date(`${siteDate.queryDate} 00:00:00`).getTime() - timegap;
				const endTime = new Date(`${siteDate.queryDate} 23:59:59`).getTime();
				*/
				const startTime = MyDate.getTime(`${siteDate.queryDate} 00:00:00`);
				const endTime = MyDate.getTime(`${siteDate.queryDate} 23:59:59`);
				console.log('queryGame', siteDate, startTime, endTime);
				const cond = new Condition({siteid: siteDate.siteid}).where('esttimatedStartTime').between(startTime, endTime);
				if (typeof siteDate.status === 'number') {
					cond.and().where('status').eq(siteDate.status);
				}
				resp.data = await this.gamesService.query(cond);
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
				extra: {token}
			}		
		}
		return resp;
	}
	async queryGameResult(token:string, filter:gameResultRequest):Promise<commonResWithData<any>> {
		let resp:commonResWithData<AnyObject> = {
			errcode: ErrCode.OK,		
		}		
		const user = tokenCheck(token);
		if (user) {
			/*
			const timegap = 2*60*60*1000;
			const startTime = new Date(`${siteDate.queryDate} 00:00:00`).getTime() - timegap;
			const endTime = new Date(`${siteDate.queryDate} 23:59:59`).getTime();
			*/
			const startTime = MyDate.getTime(`${filter.dateStart} 00:00:00`);
			const endTime = MyDate.getTime(`${filter.dateEnd} 23:59:59`);
			const cond = new Condition({siteid: filter.siteid}).where('esttimatedStartTime').between(startTime, endTime);
			if (filter.gameTitle) {
				cond.and().where('gameTitle').contains(filter.gameTitle);
			}
			if (filter.playerName) {
				//cond.and().where('players').contains({playerName: filter.playerName});
				cond.and().where('playerName').contains(filter.playerName);
			}
			if (filter.playedHoles) {
				cond.and().where('playedHoles').eq(filter.playedHoles);
			}
			// resp.data = await this.gamesService.query(cond);
			const prs = await this.playerResultService.query(cond);
			if (prs.count > 0) {
				const anyO:AnyObject = {}
				if (filter.playerName || filter.gameTitle) {
					prs.forEach((pr) => {
						const player: gameResultPlayer = {
							gameid: pr.gameid,
							date: pr.esttimatedStartTime,
							team: pr.gameTitle,
							memberID: pr.memberID,
							playerName: pr.playerName,
							courseName: pr.courseName,
							gross: pr.gross,
							hcp: pr.hcp,
							net: pr.gross - parseInt(pr.hcp.replace('+', '-'), 10),
							playedHoles: pr.playedHoles,
						}
						anyO[`${pr.gameid}${pr.playerName}`] = player;
					})
				} else {	
					prs.forEach((pr) => {
						if (!anyO[pr.gameid]) {
							const tmp:gameResultGroup = {
								gameid: pr.gameid,
								date: pr.esttimatedStartTime,
								team: pr.gameTitle,
								player: []
							}							
							anyO[pr.gameid] = tmp
						}
						const player: gameResultPlayer = {
							gameid: pr.gameid,
							playerName: pr.playerName,
							memberID: pr.memberID,
							courseName: pr.courseName,
							gross: pr.gross,
							// hcp: pr.hcp,
							// net: pr.gross - parseInt(pr.hcp.replace('+', '-'), 10),
						}
						anyO[pr.gameid].player.push(player)
					})
				}
				resp.data = Object.keys(anyO).map((key) => anyO[key]);
			} else {
				resp.data = prs;
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
				extra: {token}
			}		
		}
		return resp;
	}	
	async gameDataCheck(game:games):Promise<games> {
		// if (!game.gameid) game.gameid = hashKey();
		console.log('gameDataCheck:', game);
		if (game.gameid) {
			game = removeUnderLineData(game);
			const tmp = await this.gamesService.findOne({gameid: game.gameid});
			if (tmp) {
				Object.keys(game).forEach((key) => {
					tmp[key] = game[key];
				});
				game = tmp;
				delete (game as any).createdAt;
				delete (game as any).updatedAt;	
			}
			console.log('gameDataCheck:', game);
			let isHolesHasData = false;
			let doAddPD = false;
			if (game.players) {
				if (!game.playerDefaults) {
					if (!game.players[0].holes || game.players[0].holes.length === 0)	doAddPD = true;
				} else if (game.players.length !== game.playerDefaults.length) {
					doAddPD = true;
				}
			}
			if (doAddPD) {
				isHolesHasData = true;
				game.playerDefaults = game.players.map((player) => {
					if (isHolesHasData) {
						if (!player.holes || player.holes.length === 0) isHolesHasData = false
					}
					return {
						playerName: player.playerName,
						fullHcp: '0',
						allowance: '100',
						hcp: '0',
						hcpRound: true,
					};
				});
			}
			if (!isHolesHasData) {
				const course = await this.coursesService.findOne({courseid: game.courseid});
				const outZone = await this.zonesService.findOne({zoneid: game.outZone});
				const inZone = await this.zonesService.findOne({zoneid: game.inZone});
				const zones = [outZone, inZone];
				game.players = game.players.map((itm, idx) => {
					let holes:score[] = [];
					let no = 0;
					zones.forEach((z) => {
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
					let ctee:teeObject = itm.tee;			
					if (!itm.tee) {
						ctee = course.tees.find((t) => t.teeColor === 'White');
					}
					const tmp:player = {
						playerName: itm.playerName,
						tee: ctee,
						hcp: itm.hcp ? itm.hcp : '0',
						playerOrder: idx,
						gross: 0,
						holes,
						frontGross: 0,
						backGross: 0,
						parDiff: 0,
						stablefordPoint: 0,
						extra: itm.extra,
					};
					return tmp;
				});
			}
			if (game.carts && game.carts.length > 0) {
				game.status = gameStatus.OnGame;
				game.carts.forEach(async (cartid) => {
					this.cartsService.update({cartid}, {status: CartStatus.onduty});
					const cart = await this.cartsService.findOne({cartid});
					if (cart) {
						if (cart.deviceid) {
							this.devicesService.update({deviceid:cart.deviceid}, {status: DeviceStatus.onduty});
						}
					}
				})
			}			
		} else {
			game.gameid = hashKey();
		}
		return game;
	}
}