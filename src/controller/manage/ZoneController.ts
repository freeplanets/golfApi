import { Body, Controller, Headers, Post, Get, Param, Delete } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Zone } from "../../database/db.interface";
import ZoneService from "../../database/zone/zone.service";
import { deleteTableData, modifyTableData, queryTable } from "../../function/Commands";
import zoneData from "../../models/zone/zoneData";
import { zoneEx } from "../../models/examples/zone/zoneEx";
import zoneModifyResponse from "../../models/zone/zoneModifyResponse";
import zoneAllResponse from "../../models/zone/zoneAllResponse";
import { commonResWithData } from "src/models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";
import commonResponse from "../../models/common/commonResponse";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/zone')
export default class ZoneController {
	constructor(private readonly zoneService:ZoneService){}

	@Post('modify')
	@ApiOperation({summary: '球道分區資料新增/修改', description: '球場分區資料新增/修改'})
	@ApiBody({description: '球場分區管理', type: zoneData, examples: zoneEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async modify(@Body() body:Zone, @Headers('www-auth') token: Record<string, string> ){
		// const token = Headers('www-auth');
		const resp  = modifyTableData(String(token), this.zoneService, body);
		return resp;
	}

	/*
	@Get(':id')
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async getOne(@Param('id') id:string, @Headers('www-auth') token:Record<string, string>){
		const resp:commonResWithData<Zone> = {
			errcode: '0',
		};
		if (id) {
			// const user = jwt.decode(String(token)) as platformUser;	
			const user = tokenCheck(String(token))
			if (user) {
				try {
					const searchKey:defaultKey = {
						id: id,
					};
					resp.data = await this.zoneService.findOne(searchKey);
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
		} else {
			resp.errcode = ErrCode.MISS_PARAMETER;
			resp.error = {
				message: errorMsg('MISS_PARAMETER', 'id'),
			}
		}
		return resp;
	}
	*/
	
	@Get('all/:clubid')
	@ApiOperation({ summary: '回傳球場所有分區資料', description: '回傳球場所有分區資料'})
	@ApiParam({name:'clubid', description:'球場代號'})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneAllResponse })
	async listAll(@Param('clubid') clubid:string,@Headers('www-auth') token:Record<string, string>){
		const resp = await this.query(String(token), clubid);
		return resp;
	}

	async query(token:string, clubid: string) {
		let resp:commonResWithData<Zone[]> = {
			errcode: '0',
		}
		if (!clubid) {
			resp.errcode = ErrCode.MISS_PARAMETER;
			resp.error = {
				message: errorMsg('MISS_PARAMETER', 'clubid'),
			}
		} else {
			resp = await queryTable<Zone>(token, this.zoneService ,{clubid: clubid});
		}
		return resp;
		/*
		const user = tokenCheck(String(token));
		if (user) {
			console.log(clubid, user);
			if (clubid && isMyClub(user, clubid)) {
				try {
					const keys:Partial<Zone> = {
						clubid: clubid,
					}
					resp.data = await this.zoneService.query(keys);
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
		*/
	}

	@Delete('/:id')
	@ApiOperation({ summary: '刪除分區資料', description: '刪除分區資料'})
	@ApiParam({name:'id', description:'分區維一編碼/hashkey'})
	@ApiResponse({status: 200, description:'刪除分區回傳物件', type: commonResponse})
	async removeData(@Param('id') id:string, @Headers('www-auth') token:Record<string, string>){
		const resp = deleteTableData(String(token), this.zoneService, id);
		return resp;
	}
}