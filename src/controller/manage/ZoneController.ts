import { Body, Controller, Headers, Post, Get, Param, Delete, Put, Patch, Response } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { platformUser, zoneKey, zones } from "../../database/db.interface";
import ZoneService from "../../database/zone/zones.service";
import zoneData from "../../models/zone/zonesData";
import { zoneEx, zonesResEx } from "../../models/examples/zone/zoneEx";
import zoneModifyResponse from "../../models/zone/zoneModifyResponse";
import commonResponse from "../../models/common/commonResponse";
import zoneResponse from "../../models/zone/zoneResponse";
import queryZonesRequest from "../../models/zone/queryZonesRequest";
import { queryZonesRequestEx } from "../../models/examples/zone/queryZonesRequestEx";
import zonesResponse from "../../models/zone/zonesResponse";
import { createTableData, deleteTableData, getTableData, hashKey, queryTable, updateTableData } from "../../function/Commands";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class ZoneController {
	constructor(private readonly zoneService:ZoneService){}

	@Put('zone')
	@ApiOperation({summary: '球道分區資料新增', description: '球場分區資料新增'})
	@ApiBody({description: '球道分區資料新增', type: zoneData, examples: zoneEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async add(@Body() body:zones,@Response({passthrough:true}) res:any){
		// console.log('zone Put', body, token);
		if (!body.zoneid) body.zoneid = hashKey();
		const user = res.locals.user as platformUser;
		const resp = await createTableData<zones, zoneKey>(user, this.zoneService, body);
		return resp;
	}

	@Patch('zone/:zoneid')
	@ApiOperation({summary: '球道分區資料修改', description: '球場分區資料修改'})
	@ApiParam({name:'zoneid', description:'球區代號'})
	@ApiBody({description: '球道分區資料新增', type: zoneData, examples: zoneEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse, schema: {examples: zonesResEx} })
	async update(@Param('zoneid') zoneid:string, @Body() body:Partial<zones>,@Response({passthrough:true}) res:any){
		const keys = {
			zoneid: zoneid,
		}
		if (body.zoneid) delete body.zoneid;
		const resp = await updateTableData<zones, zoneKey>(res.locals.user, this.zoneService, body, keys);
		return resp;
	}

	@Get('zone/:zoneid')
	@ApiOperation({ summary: '回傳單筆球場分區資料', description: '回傳單筆球場分區資料'})
	@ApiParam({name:'zoneid', description:'球區代號'})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneResponse })
	async getOne(@Param('zoneid') zoneid:string, @Response({passthrough:true}) res:any){
		const resp = await getTableData(res.locals.user, this.zoneService, {zoneid: zoneid} as zoneKey);
		return resp;
	}

	@Delete('zone/:zoneid')
	@ApiOperation({ summary: '刪除分區資料', description: '刪除分區資料'})
	@ApiParam({name:'zoneid', description:'球區代號'})
	@ApiResponse({status: 200, description:'刪除分區回傳物件', type: commonResponse})
	async delete(@Param('zoneid') zoneid:string, @Response({passthrough:true}) res:any){
		const resp = await deleteTableData(res.locals.user, this.zoneService, {zoneid: zoneid} as zoneKey);
		return resp;
	}

	@Post('zone')
	@ApiOperation({ summary: '回傳球場分區資料', description: '回傳球場分區資料'})
	@ApiBody({description: '查詢球區修件', type: queryZonesRequest, examples: queryZonesRequestEx})
	@ApiResponse({status: 200, description:'球區回傳物件', type: zonesResponse})
	async query(@Body() body:Partial<zones>, @Response({passthrough:true}) res:any){
		const resp = await queryTable(res.locals.user, this.zoneService, body);
		return resp;
	}
}