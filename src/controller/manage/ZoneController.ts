import { Body, Controller, Headers, Post, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Zone, defaultKey } from "../../database/db.interface";
import ZoneService from "../../database/zone/zone.service";
import { hashKey, modifyTableData, tokenCheck } from "../../function/Commands";
import zoneData from "../../models/zone/zoneData";
import { zoneEx } from "../../models/examples/zone/zoneEx";
import zoneModifyResponse from "../../models/zone/zoneModifyResponse";
import zoneAllResponse from "../../models/zone/zoneAllResponse";
import { commonResWithData } from "src/models/if";
import { ErrCode } from "../../models/enumError";
import { errorMsg } from "../../function/Errors";


@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/zone')
export default class ZoneController {
	constructor(private readonly zoneService:ZoneService){}

	@Post('modify')
	@ApiBody({description: '球場分區管理', type: zoneData, examples: zoneEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async modify(@Body() body:Zone, @Headers('www-auth') token: Record<string, string> ){
		// const token = Headers('www-auth');
		console.log('hashKey:', hashKey());
		const user = tokenCheck(String(token));
		let resp:commonResWithData<Zone>;
		if (user) {
			body.clubid = user.siteid;
			body.modifyID = user.uid;
			if (body.zoneid) {
				resp = await modifyTableData(this.zoneService, body);
			} else {
				resp = {
					errcode: ErrCode.MISS_PARAMETER,
					error: {
						message: errorMsg('MISS_PARAMETER', 'zoneid'),
					}
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
	
	@Get('all')
	@ApiResponse({status: 200, description: '回傳物件', type: zoneAllResponse })
	async listAll(@Headers('www-auth') token:Record<string, string>){
		console.log('listAll');
		const resp = await this.query(String(token));
		return resp;
	}

	async query(token:string) {
		let resp:commonResWithData<Zone[]> = {
			errcode: '0',
		}
		const user = tokenCheck(String(token));
		if (user) {
			try {
				const keys:Partial<Zone> = {
					clubid: user.siteid,
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
			resp.errcode = ErrCode.TOKEN_ERROR;
			resp.error = {
				message: errorMsg('TOKEN_ERROR'),
			}			
		}
		return resp;
	}	
}