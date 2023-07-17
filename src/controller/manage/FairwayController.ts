import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import FairwayService from "../../database/fairway/fairway.service";
import { fairwayInfoEx } from "../../models/examples/manage/fairwayInfoEx";
import fairwayInfoRequest from "../../models/manage/fairwayInfoRequest";
import commonResponse from "../../models/common/commonResponse";
import { fairwayInfo } from "../../database/db.interface";
import { deleteTableData, isMyClub, modifyTableData, tokenCheck } from "../../function/Commands";
import { commonResWithData } from "../../models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import fairwayInfoResponse from "../../models/manage/fairwayInfoResponse";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('maname/fairway')
export default class FairwayController {
	constructor(private readonly fairwayService:FairwayService){}

	@Post('modify')
	@ApiOperation({description: '球道資料新增/修改', summary: '球道資料新增/修改'})
	@ApiBody({description:'球道資料新增/修改', type: fairwayInfoRequest, examples: fairwayInfoEx})
	@ApiResponse({status: 200, description:'球道資料新增/修改回傳物件', type: commonResponse})
	async modify(@Body() body:fairwayInfo, @Headers('www-auth') token:Record<string, string>){
		const resp = await modifyTableData<fairwayInfo>(String(token),this.fairwayService, body);
		return resp;
	}

	@Get(':clubid')
	@ApiOperation({description: '傳回指定球場所有球道資料', summary: '傳回指定球場所有球道資料'})
	@ApiResponse({status: 200, description:'回傳資料', type: fairwayInfoResponse})	
	async getClubFairway(@Param('clubid') clubid:string, @Headers('www-auth') token:Record<string, string>){
		const resp = await this.query(String(token), clubid);
		return resp;
	}

	@Get(':clubid/:zoneid')
	@ApiOperation({description: '傳回指定分區所有球道資料', summary: '傳回指定分區所有球道資料'})
	@ApiResponse({status: 200, description:'回傳資料', type: fairwayInfoResponse})
	async getZonefairway(@Param('clubid') clubid:string, @Param('zoneid') zoneid:string, @Headers('www-auth') token:Record<string, string>){
		const resp = await this.query(String(token), clubid, zoneid);
		return resp;
	}	

	@Get(':clubid/:zoneid/:fairwayid')
	@ApiOperation({description: '傳回指定球道資料', summary: '傳回指定球道資料'})
	@ApiResponse({status: 200, description:'回傳資料', type: fairwayInfoResponse})
	async getfairway(@Param('clubid') clubid:string, @Param('zoneid') zoneid:string, @Param('fairwayid') fairwayid:string, @Headers('www-auth') token:Record<string, string>){
		const fwayid = fairwayid ? Number(fairwayid) : 0;
		const resp = await this.query(String(token), clubid, zoneid, fwayid);
		return resp;
	}

	@Delete('/:id')
	@ApiOperation({ summary: '刪除分區資料', description: '刪除分區資料'})
	@ApiResponse({status: 200, description:'刪除分區回傳物件', type: commonResponse})
	async removeData(@Param('id') id:string, @Headers('www-auth') token:Record<string, string>){
		const resp = deleteTableData(String(token), this.fairwayService, id);
		return resp;
	}	
	/*
	@Get('all')
	@ApiOperation({description: '傳回所有球道資料', summary: '傳回所有球道資料'})
	async getall(@Headers('www-auth') token:Record<string, string>){
		console.log('getall', token);
		let resp:commonResWithData<fairwayInfo[]> = {
			errcode: '0',
		}
		const user = tokenCheck(String(token));
		if (user) {
			resp.data = await this.fairwayService.findAll();
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}			
		}
		return resp;
	}
	*/
	async query(token:string, clubid:string, zoneid?:string, fairwayid?:number) {
		let resp:commonResWithData<fairwayInfo[]> = {
			errcode: '0',
		}
		const user = tokenCheck(String(token));
		if (user) {
			if (clubid && isMyClub(user, clubid)) {
				try {			
					const keys:Partial<fairwayInfo> = {
						clubid: clubid,
					}
					if (zoneid) {
						keys.zoneid = zoneid;
					}
					if (fairwayid) {
						keys.fairwayid = fairwayid;
					}
					console.log('keys:', keys);
					resp.data = await this.fairwayService.query(keys);
				} catch(e) {
					resp.errcode = ErrCode.DATABASE_ACCESS_ERROR;
					resp.error = {
						message: errorMsg('DATABASE_ACCESS_ERROR'),
						extra: e,
					}					
				}
			} else {
				resp.errcode = ErrCode.ERROR_PARAMETER,
				resp.error = {
					message: errorMsg('ERROR_PARAMETER', 'clubid'),
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