import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Condition } from "dynamoose";
import GamesService from "../../database/game/games.service";
import CartsService from "../../database/cart/carts.service";
import { createScoreData, getResultByGameID, hashKey, playerDefaultHcpCal, removeUnderLineData, tokenCheck, updateTableData } from "../../function/Commands";
import { cartKey, carts, devices, gameKey, games, mapLatLong, playerDefault, playerResult, sideGame, sideGameKey } from "../../database/db.interface";
import { AnyObject, commonRes, commonResWithData, locReq, positonReq } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import positionRequest from "../../models/cart/positionRequest";
import { positionReqEx } from "../../models/examples/carposition/carPositionEx";
import _sideGameObject from "../../models/game/_sideGameObject";
import { sideGameReqEx } from "../../models/examples/game/gameDataEx";
import positionResponse from "../../models/cart/positionResponse";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";
import commonResponse from "../../models/common/commonResponse";
import playerDefaultRequest from "../../models/game/playerDefaultsRequest";
import ZonesService from "../../database/zone/zones.service";
import checkInResponse from "../../models/game/checkInResponse";
import { playerDefaultEx } from "../../models/examples/game/playerDefaultEx";
import { CartStatus, DeviceStatus, scoreLine, scoresData, sideGameRes } from "../../function/func.interface";
import DevicesService from "../../database/device/devices.service";
import _mapLatLong from "../../models/common/_mapLatLong";
import { locationEx } from "../../models/examples/device/deviceEx";
import CoursesService from "../../database/course/courses.service";
import locRequest from "../../models/common/locRequest";
import { ConditionInitializer } from "dynamoose/dist/Condition";
import ScoresUpdater from "../../class/players/ScoresUpdater";
import SideGameScoreFactory from "../../class/sidegamescore/SideGameScoreFactory";
import SideGameRegister from "../../class/sidegame/SideGameRegister";
import { gameStatus, sideGames } from "../../models/enum";
import SideGamesService from "../../database/sidegame/sidegames.service";
import MyDate from "../../class/common/MyDate";
import PlayerResultService from "../../database/playerResult/playerResult.service";
import AreaScoreCreator from "../../class/ScoreForKS/areaScoreCreator";
import { PlayScoreData } from "../../models/transData/ks/ks.interface";

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export default class InCartController {
	constructor(
		private readonly gamesService:GamesService,
		private readonly cartService:CartsService,
		private readonly zonesService:ZonesService,
		private readonly devicesService:DevicesService,
		private readonly coursesService:CoursesService,
		private readonly sidegamesService:SideGamesService,
		private readonly playerResultService:PlayerResultService
	){}
	@Get('getSideInfo/:siteid')
	@ApiOperation({summary:'取得整資料 / get golf club complete information', description: '取得球場完整資料 / get golf club complete information'})
	@ApiParam({name: 'siteid', description: '球場代號'})
	async getSiteData(@Param('siteid') siteid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<any> = {
			errcode: ErrCode.OK,
		}
		try {
			resp.data = {};
			resp.data.zones = await this.zonesService.query({siteid});
			resp.data.courses = await this.coursesService.query({siteid});
		} catch (error) {
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: error,
			}
		}
		return resp;
	}

	@Get('getCheckInData/:caddieid/:deviceid')
	@ApiOperation({summary:'取得來賓編組、分區、球車等資料/ getCheckInData', description:'取得來賓編組、分區、球車等資料/ getCheckInData'})
	@ApiParam({name: 'caddieid', description:'桿弟代號'})
	@ApiParam({name: 'deviceid', description:'設備代號'})
	@ApiResponse({status: 200, description: '編組、分區、球車等資料', type: checkInResponse})
	async getCheckInData(@Param('caddieid') caddieid:string, @Param('deviceid') deviceid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.searchCheckInData(String(token), caddieid, deviceid);
		return resp;
	}

	@Get('getSideGameScore/:gameid')
	@ApiOperation({summary:'來賓小遊戲結果 / side game result', description:'來賓小遊戲結果 / side game result'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiResponse({status:200, type:commonResponse})
	async getSideGameScore(@Param('gameid') gameid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const sgr = new SideGameRegister(this.gamesService, this.sidegamesService, gameid);
		// const resp = await this.querySideGameScore(String(token), gameid);
		const resp:commonResWithData<any> = {
			errcode: '0',
		}
		resp.data = await sgr.getSideGameScore()
		return resp;
	}

	@Get('getSideGameDetail/:gameid/:sidegameid')
	@ApiOperation({summary:'來賓小遊戲結果明細 / side game result detail', description:'來賓小遊戲結果明細 / side game result detail'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiParam({name:'sidegameid', description: '小遊戲代號'})
	@ApiResponse({status:200, type:commonResponse})
	async getSideGameDetail(@Param('gameid') gameid:string, @Param('sidegameid') sidegameid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.querySideGameDetail(String(token), gameid, sidegameid);
		return resp;
	}

	@Get('getSideGameData/:gameid/:sidegameid')
	@ApiOperation({summary:'來賓小遊戲資料 / side game data', description:'來賓小遊戲資料 / side game data'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiParam({name:'sidegameid', description: '小遊戲代號'})
	@ApiResponse({status:200, type:commonResponse})
	async getSideGameData(@Param('gameid') gameid:string, @Param('sidegameid') sidegameid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<sideGame> = {
			errcode: '0',
		}
		const sgs = new SideGameRegister(this.gamesService, this.sidegamesService, gameid);
		resp.data = await sgs.getSideGameData(sidegameid);
		// const resp1 = await this.querySideGameData(String(token), gameid, sidegameid);
		return resp;
	}

	@Delete('deleteSideGameData/:gameid/:sidegameid')
	@ApiOperation({summary:'刪除來賓小遊戲資料 / delete side game data', description:'刪除來賓小遊戲資料 / delete side game data'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiParam({name:'sidegameid', description: '小遊戲代號'})
	@ApiResponse({status:200, type:commonResponse})
	async deleteSideGameData(@Param('gameid') gameid:string, @Param('sidegameid') sidegameid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.delSideGameData(String(token), sidegameid);
		return resp;
	}		

	@Post('deviceLocation/:deviceid')
	@ApiOperation({summary:'裝置位置更新/ update device location', description:'裝置位置更新/ update device location'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiBody({description: '位置物件', type: locRequest, examples: locationEx})
	@ApiResponse({status: 200, type: positionResponse})
	async deviceLocation(@Param('deviceid') deviceid:string, @Body() body:locReq){
		console.log('deviceLocation', deviceid, body);
		const resp:commonResWithData<carts[]> = {
			errcode: ErrCode.OK,
		}		
		if (!body.siteid || !body.latitude || !body.longitude) {
			return resp;
		}
		const loc: mapLatLong = {
			latitude: body.latitude,
			longitude: body.longitude,
		} 
		const data:Partial<devices> = {
			siteid: body.siteid,
			location: loc,
		};
		try {
			let ans:any =	await this.devicesService.update({deviceid}, data);
			// console.log('location', ans);
			if (ans.cartid) {
				const key:cartKey = {
					cartid: ans.cartid,
				}
				const cart:Partial<carts> = {
					location: loc,
				}
				// let zoneSearch:Partial<carts>;
				let cond:ConditionInitializer;
				if (body.siteid && body.zoneid && body.fairwayno){
					// cart.siteid = body.siteid;
					cart.zoneid = body.zoneid;
					cart.fairwayno = body.fairwayno;
					cart.loctm = new Date().getTime();
					let searchZone = body.zoneid;
					let searchFairwayno = body.fairwayno;
					if (body.requestZoneid && body.fairwayno) {
						searchZone = body.requestZoneid;
						searchFairwayno = body.requestFairwayno;
					}
					cond = new Condition({
						siteid: body.siteid,
						zoneid: searchZone,
						fairwayno: searchFairwayno});
					if (body.distance) cart.distance = body.distance;
				}
				ans = await this.cartService.update(key, cart);
				if (cond) {
					resp.data = await this.cartService.query(cond);
				}
			}
		} catch(error) {
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR,
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: error,
			}
		}
		return resp;
	}
	@Post('updatePosition')
	@ApiOperation({summary:'更新球車位/ updatePosition',description:'更新球車位/ updatePosition'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiBody({description: '位置資料', type: positionRequest, examples: positionReqEx })
	@ApiResponse({status: 200, type:positionResponse})
	async updatePosition(@Param('deviceid') deviceid:string,@Body() body:positonReq, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<Partial<carts>[]> = {
			errcode: '0',
		};
		const user = tokenCheck(String(token));
		if (user) {
			try {
				resp.data = await this.cartService.positionUpdate(deviceid, body);
			} catch(e) {
				resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
				resp.error = {
					message: errorMsg('DATABASE_ACCESS_ERROR'),
					extra: e,
				}
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}

	@Post('setPlayerDefault/:gameid')
	@ApiOperation({summary:'小遊戲參與者資料登錄 / setPlayerDefault', description:'小遊戲參與者資料登錄 / setPlayerDefault'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiBody({description: '球員 hcp 預設資料', type:playerDefaultRequest, examples: playerDefaultEx })
	async setPlayerDefault(@Param('gameid') gameid:string, @Body() body:Partial<games>, @Headers('WWW-AUTH') token:Record<string, string>){
		console.log('setPlayerDefault', gameid, body);
		body.playerDefaults = playerDefaultHcpCal(body.playerDefaults);
		const resp = await updateTableData(String(token), this.gamesService, body, {gameid} as gameKey);
		return resp;		
	}

	@Post('sidegameRegister/:gameid')
	@ApiOperation({summary:'小遊戲登錄 / sidegameRegister', description:'小遊戲登錄 / sidegameRegister'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiBody({description:'', type: _sideGameObject, examples:sideGameReqEx})
	async sidegameRegister(@Param('gameid') gameid:string, @Body() body:sideGame, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<sideGameRes> = {
			errcode: '0',
		}
		if (tokenCheck(String(token))) {
			// try {
				//  = await this.gamesService.registerSideGame(gameid, body);
				const sgR = new SideGameRegister(this.gamesService, this.sidegamesService, gameid);
				const sgr = await sgR.checkIn(body);
				if (sgr) {
					resp.data = sgr;
				} else {
					resp.errcode = ErrCode.ERROR_PARAMETER;
					resp.error = {
						message: errorMsg('ERROR_PARAMETER', 'sideGame'),
					}
				}

				/*
			} catch(e) {
				resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
				resp.error = {
					message: errorMsg('DATABASE_ACCESS_ERROR'),
					extra: e,
				}
			}
			*/
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}

	@Post('updateGamePoint')
	@ApiOperation({summary:'擊球資料輸入 / updateGamePoint', description:'擊球資料輸入 / updateGamePoint'})
	@ApiBody({description: '擊球結果' })
	async updateGamePoint(@Body() body:scoresData, @Headers('WWW-AUTH') token:Record<string, string>){
	 	const resp = await this.updatePlayerGamePoint(String(token), body); // 更新中
		return resp;		
	}

	@Get('gameStart/:gameid/:startTime')
	@ApiOperation({summary:'開始擊球/ game start',description:'開始擊球/ game start'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiParam({name:'startTime', description:'開始擊球時間(timestamp)'})
	@ApiResponse({status: 200, type: commonResponse})
	async gameStart(@Param('gameid') gameid:string, @Param('startTime') startTime:string, @Headers('WWW-AUTH') token:Record<string, string>){
		console.log('time check:',startTime, MyDate.getTime());
		const data:Partial<games> = {
			// startTime: parseInt(startTime, 10),
			startTime: MyDate.getTime(),
		}
		const resp = await updateTableData(String(token), this.gamesService, data, {gameid} as gameKey);
		return resp;
	}

	@Get('gameEnd/:gameid/:endTime')
	@ApiOperation({summary:'結束擊球/ game ended',description:'結束擊球/ game ended'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiParam({name:'endTime', description:'結束擊球時間(timestamp)'})
	@ApiResponse({status: 200, type: commonResponse})
	async gameEnd(@Param('gameid') gameid:string, @Param('endTime') endTime:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const data:Partial<games> = {
			// endTime: parseInt(endTime, 10),
			endTime: MyDate.getTime(),
			status: gameStatus.Ended,
		}
		const cartInGame = await this.gamesService.query({gameid});
		let cartno = '';
		if (cartInGame.count > 0) {
			const game = cartInGame[0];
			const carts = game.carts;
			if (carts && carts.length > 0) {
				carts.forEach(async (cartid) => {
					this.cartService.update({cartid}, {status: CartStatus.idle});
					const cart = await this.cartService.findOne({cartid});
					if (cart) {
						if (!cartno) cartno = cart.cartName;
						if (cart.deviceid) {
							this.devicesService.update({deviceid:cart.deviceid}, {status: DeviceStatus.idle});
						}
					}				
				});
			}
			const course = await this.coursesService.findOne({courseid: game.courseid});
			console.log('get course', JSON.stringify(course));
			game.players.forEach(async (player) => {
				let playedHoles = 0;
				const areaScoreCreator = new AreaScoreCreator();
				player.holes.forEach((hole) => {
					if (hole.gross>0) playedHoles +=1;
					areaScoreCreator.addHoleScore(hole);
				});
				const pgd:PlayScoreData = {
					player_id: player.extra.player_id,
					player_name: player.playerName,
					team_id: game.extra ? game.extra.team_id : '',
					team: game.extra ? game.extra.team_id : '',
					cart: cartno,
					start_time: MyDate.toLocalString(game.startTime),
					end_time: MyDate.toLocalString(game.endTime),
					caddie: game.extra ? game.extra.caddie : [],
					area_score: areaScoreCreator.Score,
				}
				const pr:playerResult = {
					resultid: hashKey(),
					siteid: game.siteid,
					gameid: game.gameid,
					playerName: player.playerName,
					esttimatedStartTime: game.esttimatedStartTime,
					courseName: course.courseName,
					memberID: player.extra.memberId,
					gameTitle: game.gameTitle,
					hcp: player.hcp,
					gross: player.gross,
					playedHoles,
					playerScoreKS: pgd,
				}
				try {
					await this.playerResultService.create(pr)
				} catch(err) {
					console.log('save playerResult error:', err);
				}
			})
		}
		const resp = await updateTableData(String(token), this.gamesService, data, {gameid} as gameKey);
		return resp;
	}

	@Get('getResult/:siteid/:gameid')
	@ApiOperation({summary: '結果輸出/ getResult', description: '結果輸出/ getResult'})
	@ApiParam({name:'siteid', description: '球場代號'})	
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiResponse({status:200, type: checkInResponse})
	async getResult(@Param('siteid') siteid:string, @Param('gameid') gameid:string){
		const resp = await getResultByGameID(siteid, gameid, this.gamesService, this.zonesService);
		return resp;
	}

	async searchCheckInData(token:string, caddieid:string, deviceid:string):Promise<commonResWithData<any>> {
		let resp:commonResWithData<any> = {
			errcode: '0',
			data: {}		
		}
		const chk:AnyObject = {
			caddie: caddieid,
			device: deviceid, 
		}
		const user = tokenCheck(token);
		if (user) {
			chk.siteid = user.siteid;
			const ts = MyDate.getTime(new Date().toLocaleDateString());
			let cond = new Condition({siteid: user.siteid}).where('esttimatedStartTime').gt(ts).and().where('endTime').eq(0);
			const game = await this.gamesService.query(cond, [], 'siteidesttimatedstarttimeGlobalIndex');
			chk.gameCount = game.count;
			chk.caddies = [];
			if (game.count > 0) {
				game.every((g,idx) => {
					console.log('game:', g.gameid, g.carts);
					if (g.caddies && g.caddies.length > 0) {
						const fIdx = g.caddies.findIndex((itm) => itm.caddieid === caddieid);
						if (fIdx > -1){
							console.log('fIdx', fIdx, idx, caddieid, g.caddies);
							game[idx].playerDefaults = game[idx].playerDefaults.map((p) => {
								p.betterballGroup = '';
								p.selected = true;
								p.playOrder = '';
								return p;
							}) 
							resp.data.game = game[idx];
							return false;
						}
					}
					return true;
				})
			}
			if (!resp.data.game) {
				resp.errcode = ErrCode.ITEM_NOT_FOUND;
				resp.error = {
					message: errorMsg('ITEM_NOT_FOUND'),
				}
			} else {
				const g = resp.data.game as games
				/*
				const zones = [g.outZone, g.inZone];
				console.log('zones:', zones);
				cond = new Condition({siteid: user.siteid}).where('zoneid').in(zones)
				const fZones = await this.zonesService.query(cond);
				resp.data.zones = zones.map((zoneid) => {
					return fZones.find((itm) => itm.zoneid === zoneid);
				})
				*/
				//for page show

				resp.data.score = createScoreData(g.gameid, g.players, g.playerDefaults);
				/*
				const searchKey:Partial<carts> = {
					// siteid: user.siteid,
					deviceid: deviceid,
				};
				*/
				const device = await this.devicesService.findOne({deviceid});
				chk.findDevice = new Date().toLocaleString();
				if (device && device.cartid) {
					const cartid = device.cartid;
					const cart = await this.cartService.findOne({ cartid });
					delete (cart as any).updatedAt;
					console.log('cart:', cart);
					resp.data.cart = cart;
					if (!g.carts) {
						g.carts = [cart.cartid];
					} else {
						const cIdx = g.carts.indexOf(cart.cartid);
						if (cIdx == -1) g.carts.push(cart.cartid);
					}
					await this.cartService.update({cartid:cart.cartid}, {status:CartStatus.onduty});	
				}
				chk.updateDevice = new Date().toLocaleString();
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}		
		}
		/*
		resp.error = {
			message: 'time check',
			extra: chk,
		}
		*/
		return resp;
	}

	async searchCheckInDataOld(token:string, deviceid:string):Promise<commonResWithData<any>> {
		let resp:commonResWithData<any> = {
			errcode: '0',
			data: {}		
		}		
		const user = tokenCheck(token);
		if (user) {
			const searchKey:Partial<carts> = {
				siteid: user.siteid,
				deviceid: deviceid,
			};
			const carts = await this.cartService.query(searchKey);
			if (carts.count > 0) {
				const cart = carts[0];
				console.log('cart:', cart);
				let cond = new Condition({siteid: user.siteid}).where('endTime').eq(0);
				const game = await this.gamesService.query(cond);
				if (game.count > 0) {
					game.forEach((g) => {
							const fIdx = g.carts.lastIndexOf(cart.cartid)
							if (fIdx > -1) resp.data.game = game[0];
					})
				}
				if (!resp.data.game) {
					resp.errcode = ErrCode.ITEM_NOT_FOUND;
					resp.error = {
						message: errorMsg('ITEM_NOT_FOUND'),
					}
				} else {
					const g = resp.data.game as games
					const zones = [g.outZone, g.inZone];
					console.log('zones:', zones);
					cond = new Condition({siteid: user.siteid}).where('zoneid').in(zones)
					resp.data.zones = await this.zonesService.query(cond);
					resp.data.cart = cart;
					console.log('after query zones');
				}
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}		
		}
		return resp;
	}

	private newline(f0='', f1='', f2='', f3='', f4='', f5= ''):scoreLine {
		const ans:scoreLine = { f0, f1, f2, f3, f4 };
		if (f5) ans.f5 = f5;
		return ans;
	}
	async querySideGameData(token:string, gameid:string, sidegameid:string) {
		const resp:commonResWithData<sideGame> = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(token);
		if (user) {
			const ans = await this.gamesService.query({gameid}, ['sideGames']);
			if (ans.count>0) {
				const g = ans[0];
				if (g.sideGames && g.sideGames.length > 0) {
					const f = g.sideGames.find((sg) => sg.sidegameid === sidegameid);
					if (f) {
						resp.data = f;
					}
				}
			} else {
				resp.errcode = ErrCode.ITEM_NOT_FOUND;
				resp.error = {
					message: errorMsg('ITEM_NOT_FOUND'),
				}
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}
	async delSideGameData(token:string, sidegameid:string) {
		const resp:commonRes = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(token);
		if (user) {
			try {
				await this.sidegamesService.delete({sidegameid});
			} catch(error) {
				resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
				resp.error = {
					message: errorMsg('DATABASE_ACCESS_ERROR'),
					extra: error,
				}
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}		
	async querySideGameDetail(token:string, gameid:string, sidegameid:string) {
		const resp:commonResWithData<any> = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(token);
		if (user) {
				const sgr = new SideGameRegister(this.gamesService, this.sidegamesService, gameid);
				resp.data = await sgr.getSideGameDetail(sidegameid);
				// console.log(gameid, sidegameid, 'querySideGameDetail', resp.data);
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}
	async querySideGameScore(token:string, gameid:string){
		const resp:commonResWithData<any> = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(token);
		if (user) {
			const sideGameScore:sideGameRes = {
				// gameid,
				sideGameTitle: [],
				sideGameScore: [],
				sideGameTotal: [],
			}
			const ans = await this.gamesService.query({gameid}, ['playerDefaults', 'sideGames']);
			if (ans.count>0) {
				const g = ans[0];
				if (g.sideGames && g.sideGames.length > 0) {
					const stitle:scoreLine= this.newline('name');
					g.playerDefaults.forEach((player, idx) => {
						stitle[`f${idx+1}`] = player.playerName;
					});
					sideGameScore.sideGameTitle.push(stitle);
					const objT = {f1:0, f2:0, f3:0, f4: 0};
					g.sideGames.forEach((sg) => {
						if (sg.extraInfo && sg.extraInfo.total) {
							sideGameScore.sideGameScore.push(sg.extraInfo.total);
							objT.f1 += parseInt(sg.extraInfo.total.f1,10)
							objT.f2 += parseInt(sg.extraInfo.total.f2,10)
							objT.f3 += parseInt(sg.extraInfo.total.f3,10)
							objT.f4 += parseInt(sg.extraInfo.total.f4,10)
						} else {
							sideGameScore.sideGameScore.push(this.newline(sg.sideGameName, '', '', '', '', sg.sidegameid));
						}
					})
					// sideGameScore.sideGameScore = g.sideGames.map((sg) => this.newline(sg.sideGameName, '', '', '', '', sg.sidegameid));
					sideGameScore.sideGameTotal.push(this.newline('total', String(objT.f1), String(objT.f2), String(objT.f3) , String(objT.f4)));
				}
				resp.data = sideGameScore;
			} else {
				resp.errcode = ErrCode.ITEM_NOT_FOUND;
				resp.error = {
					message: errorMsg('ITEM_NOT_FOUND'),
				}
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}
	async updatePlayerGamePoint(token:string, data:scoresData){
		console.log(new Date().toLocaleString());
		const resp:commonResWithData<scoresData> = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(token);
		console.log(new Date().toLocaleString());
		if (user) {
			data = removeUnderLineData(data);
			console.log(new Date().toLocaleString());
			// console.log(data);
			const key:gameKey = {
				gameid: data.gameid,
			};
			const f = await this.gamesService.query(key, ['players', 'playerDefaults']);
			console.log('get data:', new Date().toLocaleString(), f.count);
			if (f.count > 0) {
					const oldPlayers = f[0].players;
					let playerDefaults = f[0].playerDefaults;
					if (data.playerChangeOrder) {
						const newPlayerDefaults:playerDefault[] = [];
						const playerS = data.front ? data.front : data.back;
						playerS.forEach((itm) => {
							if (itm.f0 === 'PAR' || itm.f0 === 'HDCP') return;
							const f = playerDefaults.find((p) => p.playerName === itm.f0);
							if (f) {
								newPlayerDefaults.push(f);
							}
						})
						if (newPlayerDefaults.length === playerDefaults.length) playerDefaults = newPlayerDefaults;
					}
					// sideGame
					const sideGames = await this.sidegamesService.query({gameid:data.gameid});
					const sUpdater = new ScoresUpdater(oldPlayers);
					try {
						sUpdater.update(data)
						console.log('update', new Date().toLocaleString(), sUpdater.UpdatedHoles);
						if (sUpdater.UpdatedHoles) {
							if (sideGames && sideGames.length > 0) {
								let score = sUpdater.getScores(sUpdater.UpdatedHoles);
								const sideGF:SideGameScoreFactory = new SideGameScoreFactory(sideGames);
								console.log('getUpdteScore', sUpdater.UpdatedHoles, score);
								if (sUpdater.scoreCheckIfAllHasScore(score)) {
									sideGF.addScore(score);
									console.log('after first time addScore');
									if (this.hadAffectNextGame(sideGames)) {
										let nextHoleScore = sUpdater.UpdatedHoles + 1;
										score = sUpdater.getScores(nextHoleScore);
										while(sUpdater.scoreCheckIfAllHasScore(score)) {
											// score.forAffectTheNextGame = true;
											console.log('getUpdteScore in while', score);
											sideGF.addScore(score);
											nextHoleScore+=1;
											score = sUpdater.getScores(nextHoleScore); 
										}
									}
								}
								console.log('after addScore', new Date().toLocaleString());
							}
						}
					} catch (err) {
						console.log('sidegames error:', err);
					}
					// update score
					await this.gamesService.update(key, {players:oldPlayers, playerDefaults});
					console.log('after save data', new Date().toLocaleString());
					resp.data = createScoreData(data.gameid, oldPlayers, playerDefaults);	

					// console.dir(sideGames, {depth: 8});
					sideGames.forEach(async (sg) => {
						const sgKey:sideGameKey = {
							sidegameid: sg.sidegameid,
						}
						delete sg.sidegameid;
						try {
							// console.log(sgKey.sidegameid, sg.extraInfo);
							await this.sidegamesService.update(sgKey,sg)
						} catch(e) {
							console.log('err', e);
						}
					})
					// await this.gamesService.update(key, {players:oldPlayers});
					// console.log('createScoreData:', resp.data);
					/*
				} catch(error) {
					resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
					resp.error = {
						message: errorMsg('DATABASE_ACCESS_ERROR'),
						extra: error,
					}
				}
				*/
			}		
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;	
	}
	private hadAffectNextGame(sgs:sideGame[]):boolean {
		let f = sgs.find((sg) => sg.sideGameName === sideGames.SKIN);
		if (!f) {
			f = sgs.find((sg) => sg.sideGameName === sideGames.LAS_VEGAS);
		} 
		if (!f) {
			f = sgs.find((sg) => sg.sideGameName === sideGames.HESSEIN);	
		}
		return !!f;
	}
}	