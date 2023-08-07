import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Condition } from "dynamoose";
import { commonResEx } from "../../models/examples/commonResponseEx";
import GamesService from "../../database/game/games.service";
import CartsService from "../../database/cart/carts.service";
import { tokenCheck } from "../../function/Commands";
import { carts, games, sideGame } from "../../database/db.interface";
import { commonResWithData, positonReq } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import positionRequest from "../../models/cart/positionRequest";
import { positionReqEx } from "../../models/examples/carposition/carPositionEx";
import _sideGameObject from "../../models/game/_sideGameObject";
import { sideGameReqEx, updateGamePointEx } from "../../models/examples/game/gameDataEx";
import positionResponse from "../../models/cart/positionResponse";
import _partialPlayerObject from "../../models/game/_partialPlayerObject";
import commonResponse from "../../models/common/commonResponse";
import playerDefaultRequest from "../../models/game/playerDefaultsRequest";
import EncDecString from "../../function/EncDecString";

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export default class InCartController {
	constructor(
		private readonly gamesService:GamesService,
		private readonly cartService:CartsService,
	){}

	@Get('site/:siteid')
	@ApiOperation({summary:'取得球場完整資料 / get golf club complete information(working.....)', description: '取得球場完整資料 / get golf club complete information'})
	@ApiParam({name: 'siteid', description: '球場代號'})
	getSiteData(@Param('siteid') siteid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		console.log('siteid:', siteid, process.env.API_KEY);
		const eds:EncDecString = new EncDecString(process.env.API_KEY);
		console.log(siteid, JSON.parse(eds.Decrypted(siteid)));
		return commonResEx.Response.value;
	}

	@Get('getCheckInData/:deviceid')
	@ApiOperation({summary:'取得來賓報到資料/ getCheckInData', description:'取得來賓報到資料/ getCheckInData'})
	@ApiParam({name: 'deviceid', description:'裝置代號'})
	async getCheckInData(@Param('deviceid') deviceid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await this.searchCheckInData(String(token), deviceid);
		return resp;
	}

	@Post('updatePosition')
	@ApiOperation({summary:'更新球車位/ updatePosition',description:'更新球車位/ updatePosition'})
	@ApiBody({description: '位置資料', type: positionRequest, examples: positionReqEx })
	@ApiResponse({status: 200, type:positionResponse})
	async updatePosition(@Body() body:positonReq, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<Partial<carts>[]> = {
			errcode: '0',
		};
		const user = tokenCheck(String(token));
		if (user) {
			try {
				resp.data = await this.cartService.positionUpdate(body);
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

	@Post('setPlayerDefault')
	@ApiOperation({summary:'小遊戲參與者資料登錄 / setPlayerDefault', description:'小遊戲參與者資料登錄 / setPlayerDefault'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiBody({description: '球員 hcp 預設資料', type:playerDefaultRequest })
	async setPlayerDefault(@Param('gameid') gameid:string, @Body() body:playerDefaultRequest, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<Partial<games>> = {
			errcode: '0',
		}
		if (tokenCheck(String(token))) {
			try {
				resp.data = await this.gamesService.setPlayerDefault(gameid, body.playerDefaults);
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

	@Post('sidegameRegister/:gameid')
	@ApiOperation({summary:'小遊戲登錄 / sidegameRegister (working.....)', description:'小遊戲登錄 / sidegameRegister'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiBody({description:'', type: _sideGameObject, examples:sideGameReqEx})
	async sidegameRegister(@Param('gameid') gameid:string, @Body() body:sideGame, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResWithData<Partial<games>> = {
			errcode: '0',
		}
		if (tokenCheck(String(token))) {
			try {
				resp.data = await this.gamesService.registerSideGame(gameid, body);
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

	@Post('updateGamePoint/:gameid')
	@ApiOperation({summary:'擊球資料輸入 / updateGamePoint', description:'擊球資料輸入 / updateGamePoint'})
	@ApiParam({name:'gameid', description: '來賓分組代號'})
	@ApiBody({description: '擊球結果', type: _partialPlayerObject, isArray: true, examples: updateGamePointEx})
	async updateGamePoint(@Param('gameid') gameid:string, @Body() body:_partialPlayerObject, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp:commonResponse = {
			errcode: '0',
		}
		if (tokenCheck(String(token))) {
			try {
				 await this.gamesService.updateGamePoint(gameid, body);
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

	getResult(){}

	async searchCheckInData(token:string, deviceid:string):Promise<commonResWithData<games>> {
		let resp:commonResWithData<games> = {
			errcode: '0',		
		}		
		const user = tokenCheck(token);
		if (user) {
			const searchKey:Partial<carts> = {
				siteid: user.siteid,
				deviceid: deviceid,
			};
				const carts = await this.cartService.query(searchKey, ['cartid']);
				if (carts.count > 0) {
					const cart = carts[0];
					console.log('cart:', cart);
					const cond = new Condition({siteid: user.siteid}).where('endTime').eq(0);
					const game = await this.gamesService.queryWithCondition(cond);
					if (game.count > 0) {
						game.forEach((g) => {
							 const fIdx = g.carts.lastIndexOf(cart.cartid)
							 if (fIdx > -1) resp.data = game[0];
						})
					}
					if (!resp.data) {
						resp.errcode = ErrCode.ITEM_NOT_FOUND;
						resp.error = {
							message: errorMsg('ITEM_NOT_FOUND'),
						}
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
}	