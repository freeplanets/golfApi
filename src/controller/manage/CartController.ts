import { Body, Controller, Headers, Post, Get, Param, Delete, Put, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { cartKey, carts, deviceKey, devices } from "../../database/db.interface";
import zoneModifyResponse from "../../models/zone/zoneModifyResponse";
import commonResponse from "../../models/common/commonResponse";
import zoneResponse from "../../models/zone/zoneResponse";
import { createTableData, deleteTableData, getTableData, hashKey, queryTable, tokenCheck, updateTableData } from "../../function/Commands";
import CartsService from "../../database/cart/carts.service";
import cartData from "../../models/cart/cartData";
import { cartEx, cartQueryEx, cartResEx } from "../../models/examples/cart/cartEx";
import cartResponse from "../../models/cart/cartResponse";
import queryCartsRequest from "../../models/cart/queryCartsRequest";
import cartsResponse from "../../models/cart/cartsResponse";
import DevicesService from "../../database/device/devices.service";
import { DeviceStatus } from "../../function/func.interface";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import { commonRes } from "../../models/if";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class CartController {
	constructor(
		private readonly cartsService:CartsService,
		private readonly devicesService:DevicesService,
	){}

	@Put('cart')
	@ApiOperation({summary: '球車資料新增', description: '球車資料新增'})
	@ApiBody({description: '球車資料新增', type: cartData, examples: cartEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async add(@Body() body:carts,@Headers('WWW-AUTH') token: Record<string, string>){
		body.cartid = hashKey();
		const resp = await createTableData<carts, cartKey>(String(token), this.cartsService, body);
		return resp;
	}

	@Patch('cart/:cartid')
	@ApiOperation({summary: '球車資料修改', description: '球車資料修改'})
	@ApiParam({name:'cartid', description:'球車代號'})
	@ApiBody({description: '球車資料新增', type: cartData, examples: cartEx})
	@ApiResponse({status: 200, description: '回傳物件', type: cartResponse, schema: {examples: cartResEx} })
	async update(@Param('cartid') cartid:string, @Body() body:Partial<carts>,@Headers('WWW-AUTH') token: Record<string, string>){
		const keys = {
			cartid: cartid,
		}
		if (body.cartid) delete body.cartid;
		const resp = await updateTableData<carts, cartKey>(String(token), this.cartsService, body, keys);
		return resp;
	}

	@Get('cart/:cartid')
	@ApiOperation({ summary: '回傳單筆球車資料', description: '回傳單筆球車資料'})
	@ApiParam({name:'cartid', description:'球車代號'})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneResponse })
	async getOne(@Param('cartid') cartid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await getTableData(String(token), this.cartsService, {cartid: cartid});
		return resp;
	}

	@Delete('cart/:cartid')
	@ApiOperation({ summary: '刪除球車資料', description: '刪除球車資料'})
	@ApiParam({name:'cartid', description:'球車代號'})
	@ApiResponse({status: 200, description:'刪除球車回傳物件', type: commonResponse})
	async delete(@Param('cartid') cartid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await deleteTableData(String(token), this.cartsService, {cartid: cartid});
		return resp;
	}

	@Post('cart')
	@ApiOperation({ summary: '查詢球車資料', description: '查詢球車資料'})
	@ApiBody({description: '查詢球車資料', type: queryCartsRequest, examples: cartQueryEx})
	@ApiResponse({status: 200, description:'球車回傳物件', type: cartsResponse})
	async query(@Body() body:Partial<carts>, @Headers('WWW-AUTH') token:Record<string, string>){
		// console.log('cart query', body);
		const resp = await queryTable(String(token), this.cartsService, body);
		return resp;
	}

	@Get('assignDevice/:cartid/:deviceid')
	@ApiOperation({ summary: '球車配置裝置(原裝置要改回idle,cartid清空)', description: '球車配置裝置(原裝置要改回idle,cartid清空)'})
	@ApiParam({name:'cartid', description:'球車代號'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiResponse({status: 200, description:'刪除球車回傳物件', type: commonResponse})	
	async assignDevice(@Param('cartid') cartid:string, @Param('deviceid') deviceid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		let resp:commonRes = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(String(token));
		if (user) {
			resp = await this.updateCartAndDevice(cartid, deviceid)
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}

	async updateCartAndDevice(cartid:string, deviceid:string) {
		const resp:commonRes = {
			errcode: '0',
		}
		const cartsKey:cartKey = {
			cartid,
		}
		const devicesKey:deviceKey = {
			deviceid
		};
		try {
			// console.log(devicesKey);
			// find cart
			// let ans = await this.devicesService.findOne(devicesKey);
			let cart = await this.cartsService.findOne(cartsKey);
			// console.log('device', ans);
			// let device:devices;
			if (cart) {
				// resign old device to idle
				// let cart = await this.cartsService.query(cartsKey, ['deviceid']);
				if (cart.deviceid) {
				// if (cart.count > 0 && cart[0].deviceid) {
					// console.log('check1');
					await this.setDeviceStatue(cart.deviceid, DeviceStatus.idle);
				}
				let device = await this.devicesService.findOne(devicesKey); 
				// update cart device
				if (device) {
					if (device.cartid) {
						const pcart:Partial<carts> = {
							deviceid:'',
							deviceName: '',
							deviceType: '',
						}
						await this.cartsService.update({cartid: device.cartid}, pcart);
					}
					const partialCart:Partial<carts> = {
						deviceid,
						deviceName: device.deviceName,
						deviceType: device.deviceType,
					}
					// console.log('check2', partialCart);
					await this.cartsService.update(cartsKey, partialCart);
					// set new device to onduty
					// console.log('check3');
					await this.setDeviceStatue(deviceid, DeviceStatus.onduty, cartid);	
				} else {
					resp.errcode = ErrCode.ITEM_NOT_FOUND;
					resp.error = {
						message: errorMsg('ITEM_NOT_FOUND'),
						extra: {
							deviceid,
						}
					}
				}
			} else {
				resp.errcode = ErrCode.ITEM_NOT_FOUND;
				resp.error = {
					message: errorMsg('ITEM_NOT_FOUND'),
					extra: {
						deviceid,
					}
				}
			}
		} catch(e) {
			console.log('error:', e);
			resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
			resp.error = {
				message: errorMsg('DATABASE_ACCESS_ERROR'),
				extra: e,
			}
		}
		return resp;
	}

	async setDeviceStatue(deviceid:string, status:DeviceStatus, cartid:string = '') {
		const devicesKey:deviceKey = {
			deviceid
		};
		const data:Partial<devices> = {
			// status,
			cartid,
		}
		// console.log('setDeviceStatus:', data);
		await this.devicesService.update(devicesKey, data);
	}
}