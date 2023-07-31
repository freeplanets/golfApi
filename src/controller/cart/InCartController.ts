import { Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { commonResEx } from "../../models/examples/commonResponseEx";
import GamesService from "../../database/game/games.service";
import CartsService from "../../database/cart/carts.service";
import { tokenCheck } from "../../function/Commands";
import { carts, games } from "../../database/db.interface";
import { commonResWithData } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import { Condition } from "dynamoose";

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export default class InCartController {
	constructor(
		private readonly gamesService:GamesService,
		private readonly cartService:CartsService,
	){}

	@Get('site/:siteid')
	@ApiOperation({summary:'取得球場完整資料 / get golf club complete information', description: '取得球場完整資料 / get golf club complete information'})
	@ApiParam({name: 'siteid', description: '球場代號'})
	getSiteData(@Param('siteid') siteid:string, @Headers('WWW-AUTH') token:Record<string, string>){
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
	updatePosition(){}
	sidegameRegister(){}
	updateGamePoint(){}
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