import { Body, Controller, Headers, Post, Get, Param, Delete, Put, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { deviceKey, devices, mapLatLong } from "../../database/db.interface";
import commonResponse from "../../models/common/commonResponse";
import { createTableData, deleteTableData, getTableData, hashKey, queryTable, removeUnderLineData, tokenCheck, updateTableData } from "../../function/Commands";
import DevicesService from "../../database/device/devices.service";
import deviceData from "../../models/device/deviceData";
import { deviceEx, deviceResEx, locationEx, queryDeviceRequestEx } from "../../models/examples/device/deviceEx";
import deviceReponse from "../../models/device/deviceResponse";
import queryDevicesRequest from "../../models/device/queryDevicesRequest";
import _mapLatLong from "../../models/common/_mapLatLong";
import { commonRes, commonResWithData } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class DeviceController {
	constructor(private readonly devicesService:DevicesService){}

	@Put('device')
	@ApiOperation({summary: '裝置資料新增', description: '裝置資料新增'})
	@ApiBody({description: '裝置資料新增', type: deviceData, examples: deviceEx})
	@ApiResponse({status: 200, description: '回傳物件', type: deviceReponse })
	async add(@Body() body:devices,@Headers('WWW-AUTH') token: Record<string, string>){
		// console.log('device Put', body, token);
		if(!body.deviceid) body.deviceid = hashKey();
		// const resp = await createTableData<devices, deviceKey>(String(token), this.devicesService, body);
		const resp = await this.addDevice(String(token), body);
		return resp;
	}

	@Patch('device/:deviceid')
	@ApiOperation({summary: '裝置資料修改', description: '裝置資料修改'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiBody({description: '裝置資料新增', type: deviceData, examples: deviceEx})
	@ApiResponse({status: 200, description: '回傳物件', type: deviceData, schema: {examples: deviceResEx} })
	async update(@Param('deviceid') deviceid:string, @Body() body:Partial<devices>,@Headers('WWW-AUTH') token: Record<string, string>){
		const keys = {
			deviceid: deviceid,
		}
		if (body.deviceid) delete body.deviceid;
		const resp = await updateTableData<devices, deviceKey>(String(token), this.devicesService, body, keys);
		return resp;
	}

	@Get('device/:deviceid')
	@ApiOperation({ summary: '回傳單筆裝置資料', description: '回傳單筆裝置資料'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiResponse({status: 200, description: '回傳物件', type: deviceReponse })
	async getOne(@Param('deviceid') deviceid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await getTableData(String(token), this.devicesService, {deviceid: deviceid});
		return resp;
	}

	@Delete('device/:deviceid')
	@ApiOperation({ summary: '刪除裝置資料', description: '刪除裝置資料'})
	@ApiParam({name:'deviceid', description:'裝置代號'})
	@ApiResponse({status: 200, description:'刪除裝置回傳物件', type: commonResponse})
	async delete(@Param('deviceid') deviceid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await deleteTableData(String(token), this.devicesService, {deviceid: deviceid});
		return resp;
	}

	@Post('device')
	@ApiOperation({ summary: '回傳裝置資料', description: '回傳裝置資料'})
	@ApiBody({description: '查詢裝置物件', type: queryDevicesRequest, examples: queryDeviceRequestEx})
	@ApiResponse({status: 200, description:'裝置回傳物件', type: deviceReponse})
	async query(@Body() body:Partial<devices>, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await queryTable(String(token), this.devicesService, body);
		return resp;
	}
	async addDevice(token:string, device:devices){
		const resp:commonResWithData<devices> = {
			errcode: ErrCode.OK,
		}
		const user = tokenCheck(token);
		if (user) {
			if (device.siteid){
				device = removeUnderLineData(device);
				const devKey:deviceKey = {
					deviceid: device.deviceid,
				}
				device.modifyid = user.uid;
				try {
					const f = this.devicesService.findOne(devKey);
					if (f) {
						delete device.deviceid;
						resp.data = await this.devicesService.update(devKey, device);
					} else {
						resp.data = await this.devicesService.create(device);
					}
				} catch(error) {
					resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
					resp.error = {
						message: errorMsg('DATABASE_ACCESS_ERROR'),
						extra: error,
					}
				}				
			} else { 
				resp.errcode = ErrCode.ERROR_PARAMETER;
				resp.error = {
					message: errorMsg('ERROR_PARAMETER', 'siteid'),
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
}