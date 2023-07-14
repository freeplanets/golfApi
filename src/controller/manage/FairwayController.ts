import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import FairwayService from "../../database/fairway/fairway.service";
import { fairwayInfoEx } from "../../models/examples/manage/fairwayInfoEx";
import fairwayInfoRequest from "../../models/manage/fairwayInfoRequest";
import commonResponse from "../../models/common/commonResponse";
import { fairwayInfo } from "../../database/db.interface";
import { modifyTableData, tokenCheck } from "../../function/Commands";
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
		let resp:commonResWithData<fairwayInfo> = {
			errcode: '0',
		}
		const user = tokenCheck(String(token));
		if (user) {
			body.clubid = user.siteid;
			body.modifyID = user.uid;
			resp = await modifyTableData<fairwayInfo>(this.fairwayService, body)
		} else {
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}
		}
		return resp;
	}

	@Get(':zoneid')
	@ApiOperation({description: '傳回指定分區所有球道資料', summary: '傳回指定分區所有球道資料'})
	@ApiResponse({status: 200, description:'回傳資料', type: fairwayInfoResponse})
	async getZonefairway(@Param('zoneid') zoneid:string, @Headers('www-auth') token:Record<string, string>){
		const resp = await this.query(String(token), zoneid);
		return resp;
	}	

	@Get(':zoneid/:fairwayid')
	@ApiOperation({description: '傳回指定球道資料', summary: '傳回指定球道資料'})
	@ApiResponse({status: 200, description:'回傳資料', type: fairwayInfoResponse})
	async getfairway(@Param('zoneid') zoneid:string, @Param(':fairwayid') fairwayid:number, @Headers('www-auth') token:Record<string, string>){
		const resp = await this.query(String(token), zoneid, fairwayid);
		return resp;
	}

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

	async query(token:string, zoneid:string, fairwayid:number=0) {
		let resp:commonResWithData<fairwayInfo[]> = {
			errcode: '0',
		}
		const user = tokenCheck(String(token));
		if (user) {
			try {
				const keys:Partial<fairwayInfo> = {
					zoneid: zoneid,
				}
				if (fairwayid > 0) {
					keys.fairwayid = fairwayid;
				}
				resp.data = await this.fairwayService.query(keys);
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
}