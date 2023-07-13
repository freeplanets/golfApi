import { Body, Controller, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import Club from "../database/db.interface";
import ClubService from "../database/club/club.service";
import { clubInfoEx } from "../models/examples/club/clubInfoEx";
import clubInfoRequest from "../models/manage/clubInfoRequest";
import commonResponse from "../models/common/commonResponse";
import { defaultKey } from "../database/db.interface";
import { commonResWithData } from "../models/if";
import responseWithData from "../models/common/responseWithData";

@ApiBearerAuth()
@ApiTags('Club')
@Controller('club')
export default class ClubController {
	constructor(
		private readonly clubService:ClubService
	){}

	@Post('modify')
	@ApiBody({description:'球場資料管理', type: clubInfoRequest, examples: clubInfoEx})
	@ApiResponse({status: 200, description:'回傳物件', type: commonResponse})
	async add(@Body() body:Club){
		const token = Headers('www-auth');
		console.log(body, token);
		const response:commonResWithData<Partial<Club>> = {
			errcode: '0',
		};
		try {
			let ans:Partial<Club>;
			if (body.id) {
				const key:defaultKey = {id: body.id};
				console.log('key:', key);
				const f = await this.clubService.findOne(key);
				console.log('find:', f);
				if (f && f.id) {
					delete body.id;
					console.log('body:', body);
					ans = await this.clubService.update(key, body);
				} else {
					ans = await this.clubService.create(body);
				}
				response.data = ans;
			}			
		} catch (e) {
			console.log('error:', e);
			response.errcode = '9',
			response.error = e;
		} 
		return response;
	}

	@Get('/:id')
	@ApiParam({name: 'id', description:'球場代號'})
	@ApiResponse({status:200, description:'回傳球場資料', type:responseWithData<Club> })
	async getOne(@Param('id') id:string){
		const token = Headers();
		console.log(id, token)
		const response = new responseWithData<Club>();
		response.errcode = '0';
		if (id) {
			const key:defaultKey = {
				id: id,
			}
			const ans = await this.clubService.findOne(key);
			if (ans) {
				response.data = ans;
			}
		} else {
			response.errcode = '9';
			response.error.message = 'missing param id';
		}
		return response;
	}

	@Get('all')
	async getAll(){
		const list = await this.clubService.findAll();
		return list;
	}
}
