import { Body, Controller, Headers, Post, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Zone, defaultKey, platformUser } from "../../database/db.interface";
import ZoneService from "../../database/zone/zone.service";
import { modifyTableData } from "../../function/Commands";
import zoneData from "../../models/zone/zoneData";
import { JwtService } from "@nestjs/jwt";
import { zoneEx } from "../../models/examples/zone/zoneEx";
import zoneModifyResponse from "../../models/zone/zoneModifyResponse";
import zoneAllResponse from "../../models/zone/zoneAllResponse";
import { commonResWithData } from "src/models/if";
import { ErrCode } from "src/models/enumError";
import { errorMsg } from "src/function/Errors";

const jwt = new JwtService();

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/zone')
export default class ZoneController {
	constructor(private readonly zoneService:ZoneService){}

	@Get('all')
	@ApiResponse({status: 200, description: '回傳物件', type: zoneAllResponse })
	async listAll(@Headers('www-auth') token:Record<string, string>){
		const resp:commonResWithData<Zone[]> = {
			errcode: '0',
		}
		const user = jwt.decode(String(token)) as platformUser;
		if (user.active) {
			try {
				resp.data = await this.zoneService.findAll();
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

	@Get(':ZoneID')
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async getOne(@Param('ZoneID') zoneid:string, @Headers('www-auth') token:Record<string, string>){
		const resp:commonResWithData<Zone> = {
			errcode: '0',
		}
		const user = jwt.decode(String(token)) as platformUser;
		if (user.active && zoneid) {
			try {
				const searchKey:defaultKey = {
					id: zoneid,
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
			if (zoneid) {
				resp.errcode = ErrCode.MISS_PARAMETER;
				resp.error = {
					message: errorMsg('MISS_PARAMETER'),
				}
			} else {
				resp.errcode = ErrCode.TOKEN_ERROR;
				resp.error = {
					message: errorMsg('TOKEN_ERROR'),
				}
			}
		}
		return resp;
	}

	@Post('modify')
	@ApiBody({description: '球場分區管理', type: zoneData, examples: zoneEx})
	@ApiResponse({status: 200, description: '回傳物件', type: zoneModifyResponse })
	async modify(@Body() body:Zone, @Headers('www-auth') token: Record<string, string> ){
		// const token = Headers('www-auth');
		const user = jwt.decode(String(token)) as platformUser;
		body.clubid = user.siteid;
		body.modifyID = user.uid;
		const resp = await modifyTableData(this.zoneService, body);
		return resp;
	}
}