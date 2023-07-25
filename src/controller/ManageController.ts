import { Controller, Post, Headers, Body, Get, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import commonResponse from "../models/common/commonResponse";
import { commonResEx } from "../models/examples/commonResponseEx";
import { createManager,  updateManager } from "../models/if";
import { fairwayInfo, carPosition } from "../database/db.interface";
import updateProfileRequest from "../models/manage/updateProfileRequest";
import { updateManagerEx } from "../models/examples/manage/updateManagerEx";
import { createManagerEx } from "../models/examples/manage/createManagerEx";
import createProfileRequest from "../models/manage/createProfileRequest";
import clubInfoRequest from "../models/manage/clubInfoRequest";
import { clubInfoEx } from "../models/examples/club/clubInfoEx";
import fairwayInfoRequest from "../models/zone/fairway/_fairwayObject";
import { fairwayInfoEx, fairwayInfoResEx } from "../models/examples/zone/fairwayInfoEx";
import fairwayInfoResponse from "../models/zone/fairway/fairwayInfoResponse";
import positionRequest from "../models/manage/positionRequest";
import { carInFairwayEx, carPositionEx } from "../models/examples/carposition/carPositionEx";
import carInFairwayResponse from "../models/carposition/carInFairwayResponse";
import Club from "../database/db.interface";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export class ManageController {
	constructor(){}
	@Post('createProfile')
	@ApiBody({description:'新增管理人員資料', type: createProfileRequest, examples: createManagerEx})
	@ApiResponse({status: 200, description:'新增管理人員回傳物件', type: commonResponse})
	createProfile(@Body() body:createManager){
		const token = Headers('WWW-AUTH');
		console.log(body, token);
		return commonResEx.Response.value;
	}

	@Post('updateProfile')
	@ApiBody({description:'修改管理人員資料', type: updateProfileRequest, examples: updateManagerEx})
	@ApiResponse({status: 200, description:'修改管理人員回傳物件', type: commonResponse})
	updateProfile(@Body() body:updateManager){
		const token = Headers('WWW-AUTH');
		console.log(body, token);
		return commonResEx.Response.value;
	}

	@Post('modifyClubInfo')
	@ApiBody({description:'修改球場資料', type: clubInfoRequest, examples: clubInfoEx})
	@ApiResponse({status: 200, description:'修改球場資料回傳物件', type: commonResponse})
	modifyClubInfo(@Body() body:Club){
		const token = Headers('WWW-AUTH');
		console.log(body, token);
		return commonResEx.Response.value;
	}
	
	@Post('modifyFairwayInfo')
	@ApiBody({description:'球道資料新增/修改', type: fairwayInfoRequest, examples: fairwayInfoEx})
	@ApiResponse({status: 200, description:'球道資料新增/修改回傳物件', type: commonResponse})
	modifyFairwayInfo(@Body() body:fairwayInfo){
		const token = Headers('WWW-AUTH');
		console.log(body, token);
		return commonResEx.Response.value;
	}

	@Get('getFairwayInfo/:ClubID')
	@ApiResponse({status: 200, description:'球道資料列表', type:fairwayInfoResponse})
	getFairwayInfo(@Param('ClubID') siteid:string){
		const token = Headers('WWW-AUTH');
		console.log(siteid, token);
		return fairwayInfoResEx.Response.value;
	}

	@Get('getFairwayInfo/:ClubID/:ZoneID')
	@ApiResponse({status: 200, description:'球道資料列表', type:fairwayInfoResponse})
	getFairwayInfoWithZoneID(@Param('ClubID') siteid:string, @Param('ZoneID') zoneid:string){
		const token = Headers('WWW-AUTH');
		console.log(siteid, zoneid, token);
		return fairwayInfoResEx.Response.value;
	}

	@Get('getFairwayInfo/:ClubID/:ZoneID/:FairwayID')
	@ApiResponse({status: 200, description:'球道資料列表', type:fairwayInfoResponse})	
	getFairwayInfoPlusFairwayID(@Param('ClubID') siteid:string, @Param('ZoneID') zoneid:string,
		@Param('FairwayID') fairwayid:string){
		const token = Headers('WWW-AUTH');
		console.log(siteid, zoneid, fairwayid, token);
		return fairwayInfoResEx.Response.value;
	}

	@Post('updatePosition')
	@ApiBody({description: '更新球車位置回傳', type: positionRequest, examples: carPositionEx})
	@ApiResponse({status: 200, description: '回傳球道內所有球車的位置',type: carInFairwayResponse})
	updatePosition(@Body() body:carPosition){
		const token = Headers('WWW-AUTH');
		console.log(body, token);
		return carInFairwayEx.Response.value;
	}
}