import { Body, Controller, Delete, Get, Headers, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import CoursesService from "../../database/courses/courses.service";
import { courses } from "../../database/db.interface";
import { deleteTableData, modifyTableData, queryTable } from "../../function/Commands";
import commonResponse from "../../models/common/commonResponse";
import courseData from "../../models/courses/courseData";
import coursesResponse from "../../models/courses/coursesResponse";
import { courseEx } from "../../models/examples/course/courseEx";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/courses')
export default class CoursesController {
	constructor(private readonly coursesService:CoursesService){}

	@Post('modify')
	@ApiOperation({summary: '球道組合新增/修改', description:'球道組合新增/修改'})
	@ApiBody({description: '球道組合資料', type: courseData, examples: courseEx})
	@ApiResponse({status: 200, type:commonResponse})
	async modify(@Body() body:courses, @Headers('www-auth') token:Record<string, string>){
		const resp = await modifyTableData(String(token), this.coursesService, body);
		return resp;
	}

	@Get('all/:clubid')
	@ApiOperation({summary: '回傳球場球道組合', description:'回傳球場球道組合'})
	@ApiResponse({status: 200, type: coursesResponse})
	async listAll(@Param('clubid') clubid:string, @Headers('www-auth') token:Record<string, string>){
		const resp = await queryTable(String(token), this.coursesService, { clubid: clubid });
		return resp;
	}

	@Delete(':id')
	@ApiOperation({summary: '刪除球道組合', description:'刪除球道組合'})
	@ApiResponse({status:200, type:commonResponse})
	async removeData(@Param('id') id:string, @Headers('www-auth') token:Record<string, string>){
		const resp = await deleteTableData(String(token), this.coursesService, id);
		return resp;
	}
}