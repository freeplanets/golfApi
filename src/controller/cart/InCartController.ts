import { Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { commonResEx } from "../../models/examples/commonResponseEx";

@ApiBearerAuth()
@ApiTags('Cart')
@Controller('cart')
export default class InCartController {

	@Get('site/:siteid')
	@ApiOperation({summary:'取得球場完整資料 / get golf club complete information', description: '取得球場完整資料 / get golf club complete information'})
	@ApiParam({name: 'siteid', description: '球場代號'})
	getSiteData(@Param('siteid') siteid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		return commonResEx.Response.value;
	}

	@Get('getCheckInData/:deviceid')
	@ApiOperation({summary:'取得來賓報到資料/ getCheckInData', description:'取得來賓報到資料/ getCheckInData'})
	@ApiParam({name: 'deviceid', description:'裝置代號'})
	getCheckInData(@Param('deviceid') deviceid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		return commonResEx.Response.value;
	}

	@Post('updatePosition')
	@ApiOperation({summary:'更新球車位/ updatePosition',description:'更新球車位/ updatePosition'})
	updatePosition(){}
	sidegameRegister(){}
	updateGamePoint(){}
	getResult(){}
}	