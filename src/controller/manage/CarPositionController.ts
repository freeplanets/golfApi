import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import CarPositionService from "../../database/carPosition/CarPosition.service";
import { carPosition } from "../../database/db.interface";
import carPositionData from "../../models/carposition/carPositionData";
import { carPositionEx } from "../../models/examples/carposition/carPositionEx";
import carInFairwayResponse from "../../models/carposition/carInFairwayResponse";
import { getCarTrack, modifyTableData, queryTable } from "../../function/Commands";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/carposition')
export default class CarPositionController {
	constructor(private serviceCarPosition:CarPositionService){}

	@Post('modify')
	@ApiOperation({ summary: '更新球車位置(修改中...)', description: '更新球車位置'})
	@ApiBody({description: '球車位置位資料', type: carPositionData, examples: carPositionEx})
	@ApiResponse({status: 200, description:'回傳同球道的球車位置', type: carInFairwayResponse})
	async modify(@Body() body:carPosition,@Headers('www-auth') token:Record<string, string>){
		console.log('check0');
		const resp = await modifyTableData(String(token), this.serviceCarPosition, body);
		return resp;
	}
	
	@Get('cartrack/:clubid/:carid')
	@ApiOperation({summary: '球車位置軌跡', description: '球車位置軌跡'})
	@ApiResponse({status: 200, description: '回傳球車位置軌跡',type:carInFairwayResponse})
	async carTrack(@Param('clubid') clubid:string, @Param('carid') carid:string, 
		@Headers('www-auth') token:Record<string, string>){
		console.log('CarTrack:', clubid, carid);
		const resp = getCarTrack(String(token), this.serviceCarPosition, clubid, carid);
		return resp;
	}

	@Get(':clubid/:zoneid/:fairwayid')
	@ApiOperation({summary: '球道上所有球車的位置', description: '球道上所有球車的位置'})
	@ApiResponse({status: 200, description: '回傳球道上所有球車的位置',type:carInFairwayResponse})
	async getCarsInFairway(@Param('clubid') clubid:string,@Param('zoneid') zoneid:string, @Param('fairwayid') fairwayid:string, 
		@Headers('www-auth') token:Record<string, string>){
			console.log('check1');
		const keys: Partial<carPosition> = {
			clubid: clubid,
			zoneid: zoneid,
			fairwayid: Number(fairwayid),
		}
		const resp = await queryTable(String(token), this.serviceCarPosition, keys);
		return resp;
	}
	
}