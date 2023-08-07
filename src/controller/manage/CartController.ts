import { Body, Controller, Headers, Post, Get, Param, Delete, Put, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { cartKey, carts } from "../../database/db.interface";
import zoneModifyResponse from "../../models/zone/zoneModifyResponse";
import commonResponse from "../../models/common/commonResponse";
import zoneResponse from "../../models/zone/zoneResponse";
import { createTableData, deleteTableData, getTableData, hashKey, queryTable, updateTableData } from "../../function/Commands";
import CartsService from "../../database/cart/carts.service";
import cartData from "../../models/cart/cartData";
import { cartEx, cartQueryEx, cartResEx } from "../../models/examples/cart/cartEx";
import cartResponse from "../../models/cart/cartResponse";
import queryCartsRequest from "../../models/cart/queryCartsRequest";
import cartsResponse from "../../models/cart/cartsResponse";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class CartController {
	constructor(private readonly cartService:CartsService){}

	@Put('cart')
	@ApiOperation({summary: '球車資料新增', description: '球車資料新增'})
	@ApiBody({description: '球車資料新增', type: cartData, examples: cartEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async add(@Body() body:carts,@Headers('WWW-AUTH') token: Record<string, string>){
		body.cartid = hashKey();
		const resp = await createTableData<carts, cartKey>(String(token), this.cartService, body);
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
		const resp = await updateTableData<carts, cartKey>(String(token), this.cartService, body, keys);
		return resp;
	}

	@Get('cart/:cartid')
	@ApiOperation({ summary: '回傳單筆球車資料', description: '回傳單筆球車資料'})
	@ApiParam({name:'cartid', description:'球車代號'})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneResponse })
	async getOne(@Param('cartid') cartid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await getTableData(String(token), this.cartService, {cartid: cartid});
		return resp;
	}

	@Delete('cart/:cartid')
	@ApiOperation({ summary: '刪除球車資料', description: '刪除球車資料'})
	@ApiParam({name:'cartid', description:'球車代號'})
	@ApiResponse({status: 200, description:'刪除球車回傳物件', type: commonResponse})
	async delete(@Param('cartid') cartid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await deleteTableData(String(token), this.cartService, {cartid: cartid});
		return resp;
	}

	@Post('cart')
	@ApiOperation({ summary: '查詢球車資料', description: '查詢球車資料'})
	@ApiBody({description: '查詢球車資料', type: queryCartsRequest, examples: cartQueryEx})
	@ApiResponse({status: 200, description:'球車回傳物件', type: cartsResponse})
	async query(@Body() body:Partial<carts>, @Headers('WWW-AUTH') token:Record<string, string>){
		// console.log('cart query', body);
		const resp = await queryTable(String(token), this.cartService, body);
		return resp;
	}
}