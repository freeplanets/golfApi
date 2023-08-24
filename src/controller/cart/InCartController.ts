import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Condition } from "dynamoose";
import GamesService from "../../database/game/games.service";
import CartsService from "../../database/cart/carts.service";
import { createScoreData, playerDefaultHcpCal, tokenCheck, updateTableData } from "../../function/Commands";
import { carts, devices, games, mapLatLong, sideGame } from "../../database/db.interface";
import { commonRes, commonResWithData, positonReq } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import positionRequest from "../../models/cart/positionRequest";
import { positionReqEx } from "../../models/examples/carposition/carPositionEx";
import _sideGameObject from "../../models/game/_sideGameObject";
import { scoresEx, sideGameReqEx } from "../../models/examples/game/gameDataEx";
import positionResponse from "../../models/cart/positionResponse";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";
import commonResponse from "../../models/common/commonResponse";
import playerDefaultRequest from "../../models/game/playerDefaultsRequest";
import ZonesService from "../../database/zone/zones.service";
import checkInResponse from "../../models/game/checkInResponse";
import { playerDefaultEx } from "../../models/examples/game/playerDefaultEx";
import { CartStatus, scoresData } from "../../function/func.interface";
import DevicesService from "../../database/device/devices.service";
import _mapLatLong from "../../models/common/_mapLatLong";
import { locationEx } from "../../models/examples/device/deviceEx";

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export default class InCartController {
	constructor(
		private readonly gamesService:GamesService,
		private readonly cartService:CartsService,
		private readonly zonesService:ZonesService,
		private readonly devicesService:DevicesService,
	){}
/*
	@Get('site/:siteid')
	@ApiOperation({summary:'取得整資料 / get golf club complete information(working.....)', description: '取得球場完整資料 / get golf club complete information'})
	@ApiParam({name: 'siteid', description: '球場代號'})
	async getSiteData(@Param('siteid') siteid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await queryTable(String(token), this.zonesService, { siteid } );
		return resp;
	}
*/
	@Get('getCheckInData/:caddieid/:deviceid')
	@ApiOperation({summary:'取得來賓編組、分區、球車等資料/ getCheckInData', description:'取得來賓編組、分區、球車等資料/ getCheckInData'})
	@ApiParam({name: 'caddieid', description:'桿弟代號'})
	@ApiParam({name: 'deviceid', description:'設備代號'})
	@ApiResponse({status: 200, description: '編組、分區、球車等資料', type: checkInResponse})
	async getCheckInData(@Param('caddieid') caddieid:string, @Param('deviceid') deviceid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.searchCheckInData(String(token), caddieid, deviceid);
		return resp;
	}
	@Post('deviceLocation/:deviceid')
	@ApiOperation({summary:'裝置位置更新/ update device location', description:'裝置位置更新/ update device location'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiBody({description: '位置物件', type: _mapLatLong, examples: locationEx})
	@ApiResponse({status: 200, type: commonResponse})
	async deviceLocation(@Param('deviceid') deviceid:string, @Body() body:mapLatLong){
		console.log('deviceLocation', deviceid, body);
		const loc: mapLatLong = {
			latitude: body.latitude,
			longitude: body.longitude,
		} 
		const data:Partial<devices> = {
			location: loc,
		};
		const resp:commonRes = {
			errcode: ErrCode.OK,
		}
		try {
			const ans =	await this.devicesService.update({deviceid}, data);
			console.log('update:', ans);
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
		const resp = await updateTableData(String(token), this.gamesService, body, {gameid});
		return resp;		
	}

	@Post('sidegameRegister/:gameid')
	@ApiOperation({summary:'小遊戲登錄 / sidegameRegister (working.....)', description:'小遊戲登錄 / sidegameRegister'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiBody({description:'', type: _sideGameObject, examples:sideGameReqEx})
	async sidegameRegister(@Param('gameid') gameid:string, @Body() body:sideGame, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<Partial<games>> = {
			errcode: '0',
		}
		if (tokenCheck(String(token))) {
			// try {
				resp.data = await this.gamesService.registerSideGame(gameid, body);
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
		const resp:commonResWithData<scoresData> = {
			errcode: '0',
		}
		if (tokenCheck(String(token))) {
			try {
				 resp.data = await this.gamesService.updatePlayerGamePoint(body); // 更新中
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

	@Get('gameStart/:gameid/:startTime')
	@ApiOperation({summary:'開始擊球/ game start',description:'開始擊球/ game start'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiParam({name:'startTime', description:'開始擊球時間(timestamp)'})
	@ApiResponse({status: 200, type: commonResponse})
	async gameStart(@Param('gameid') gameid:string, @Param('startTime') startTime:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const data:Partial<games> = {
			startTime: parseInt(startTime, 10),
		}
		const resp = await updateTableData(String(token), this.gamesService, data, {gameid});
		return resp;
	}

	@Get('gameEnd/:gameid/:endTime')
	@ApiOperation({summary:'開始擊球/ game start',description:'開始擊球/ game start'})
	@ApiParam({name: 'gameid', description: '編組代號'})
	@ApiParam({name:'endTime', description:'結束擊球時間(timestamp)'})
	@ApiResponse({status: 200, type: commonResponse})
	async gameEnd(@Param('gameid') gameid:string, @Param('endTime') endTime:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const data:Partial<games> = {
			endTime: parseInt(endTime, 10),
		}
		const resp = await updateTableData(String(token), this.gamesService, data, {gameid});
		return resp;
	}

	@Get('getResult/:gameid')
	@ApiOperation({summary: '結果輸出/ getResult (建構中...)', description: '結果輸出/ getResult'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiResponse({})	
	getResult(){}

	async searchCheckInData(token:string, caddieid:string, deviceid:string):Promise<commonResWithData<any>> {
		let resp:commonResWithData<any> = {
			errcode: '0',
			data: {}		
		}		
		const user = tokenCheck(token);
		if (user) {
			const ts = this.todayStartTs();
			let cond = new Condition({siteid: user.siteid}).where('esttimatedStartTime').gt(ts).and().where('endTime').eq(0);
			const game = await this.gamesService.query(cond);
			if (game.count > 0) {
				game.forEach((g,idx) => {
					 const fIdx = g.caddies.findIndex((itm) => itm.caddieid === caddieid)
					 if (fIdx > -1){
						console.log('fIdx', fIdx, idx, caddieid, g.caddies);
						resp.data.game = game[idx];
					 }
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
				const fZones = await this.zonesService.query(cond);
				resp.data.zones = zones.map((zoneid) => {
					return fZones.find((itm) => itm.zoneid === zoneid);
				})
				//for page show
				console.log('for page show');
				resp.data.score = createScoreData(g.gameid, g.players);
				console.log('after query zones');
				/*
				const searchKey:Partial<carts> = {
					// siteid: user.siteid,
					deviceid: deviceid,
				};
				*/
				const device = await this.devicesService.findOne({deviceid});
				if (device && device.cartid) {
					const cartid = device.cartid;
					const cart = await this.cartService.findOne({ cartid });
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
			}
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR,
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}		
		}
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
	todayStartTs() {
		const today = new Date().toLocaleDateString('zh-TW');
		const tsms = new Date(today).getTime();
		console.log('todayStartTs', today, tsms);
		return tsms;
	}	
}	