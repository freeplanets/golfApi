import { Controller, Post, Headers, Body } from "@nestjs/common";
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import commonResponse from "../models/common/commonResponse";
import { commonResEx } from "../models/examples/commonResponseEx";
import { clubInfo, createManager, updateManager, zoneInfo } from "../models/if";
import updateProfileRequest from "../models/manage/updateProfileRequest";
import { updateManagerEx } from "../models/examples/manage/updateManagerEx";
import { createManagerEx } from "../models/examples/manage/createManagerEx";
import createProfileRequest from "../models/manage/createProfileRequest";
import clubInfoRequest from "../models/manage/clubInfoRequest";
import { clubInfoEx } from "../models/examples/manage/clubInfoEx";
import zoneInfoRequest from "../models/manage/zoneInfoRequest";
import { zoneInfoEx } from "../models/examples/manage/zoneInfoEx";

@ApiTags('Manage')
@Controller('manage')
export class ManageController {
	constructor(){}
	@Post('createProfile')
	@ApiHeader({name: 'www-auth'})
	@ApiBody({description:'新增管理人員資料', type: createProfileRequest, examples: createManagerEx})
	@ApiResponse({status: 200, description:'新增管理人員回傳物件', type: commonResponse})
	createProfile(@Body() body:createManager, @Headers('www-auth') token:string){
		console.log(body, token);
		return commonResEx.Response.value;
	}

	@Post('updateProfile')
	@ApiHeader({name: 'www-auth'})
	@ApiBody({description:'修改管理人員資料', type: updateProfileRequest, examples: updateManagerEx})
	@ApiResponse({status: 200, description:'修改管理人員回傳物件', type: commonResponse})
	updateProfile(@Body() body:updateManager, @Headers('www-auth') token:string){
		console.log(body, token);
		return commonResEx.Response.value;
	}

	@Post('modifyClubInfo')
	@ApiHeader({name: 'www-auth'})
	@ApiBody({description:'修改球場資料', type: clubInfoRequest, examples: clubInfoEx})
	@ApiResponse({status: 200, description:'修改球場資料回傳物件', type: commonResponse})
	modifyClubInfo(@Body() body:clubInfo, @Headers('www-auth') token:string){
		console.log(body, token);
		return commonResEx.Response.value;
	}
	
	@Post('modifyZoneInfo')
	@ApiHeader({name: 'www-auth'})
	@ApiBody({description:'修改球場分區資料', type: zoneInfoRequest, examples: zoneInfoEx})
	@ApiResponse({status: 200, description:'修改球場分區資料回傳物件', type: commonResponse})
	modifyZoneInfo(@Body() body:zoneInfo, @Headers('www-auth') token:string){
		console.log(body, token);
		return commonResEx.Response.value;
	}
}