import { Body, Controller, Headers, Post, Get, Param, Delete, Put, Patch } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { courseKey, courses } from "../../database/db.interface";
import coursesData from "../../models/zone/zonesData";
import commonResponse from "../../models/common/commonResponse";
import { createTableData, deleteTableData, getTableData, hashKey, queryTable, updateTableData } from "../../function/Commands";
import CoursesService from "../../database/course/courses.service";
import courseData from "../../models/courses/courseData";
import { courseEx, queryCoursesRequestEx } from "../../models/examples/course/courseEx";
import courseResponse from "../../models/courses/courseResponse";
import queryCoursesRequest from "../../models/courses/queryCoursesRequest";
import coursesResponse from "../../models/courses/coursesResponse";

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage')
export default class CourseController {
	constructor(private readonly courseService:CoursesService){}

	@Put('course')
	@ApiOperation({summary: '球道組合資料新增', description: '球道組合資料新增'})
	@ApiBody({description: '球道組合資料新增', type: courseData, examples: courseEx})
	@ApiResponse({status: 200, description: '回傳物件', type:courseResponse})
	async add(@Body() body:courses,@Headers('WWW-AUTH') token: Record<string, string>){
		body.courseid = hashKey();
		const resp = await createTableData<courses, courseKey>(String(token), this.courseService, body);
		return resp;
	}

	@Patch('course/:courseid')
	@ApiOperation({summary: '球道組合資料修改', description: '球道組合資料修改'})
	@ApiParam({name:'courseid', description:'球道組合代號'})
	@ApiBody({description: '球道組合資料新增', type: coursesData, examples: courseEx})
	@ApiResponse({status: 200, description: '回傳物件', type: courseResponse })
	async update(@Param('courseid') courseid:string, @Body() body:Partial<courses>,@Headers('WWW-AUTH') token: Record<string, string>){
		const keys = {
			courseid: courseid,
		}
		if (body.courseid) delete body.courseid;
		const resp = await updateTableData<courses, courseKey>(String(token), this.courseService, body, keys);
		return resp;
	}

	@Get('course/:courseid')
	@ApiOperation({ summary: '回傳單筆球道組合資料', description: '回傳單筆球道組合資料'})
	@ApiParam({name:'courseid', description:'球道組合代號'})
	@ApiResponse({status: 200, description: '回傳物件', type: courseResponse })
	async getOne(@Param('courseid') courseid:string,@Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await getTableData(String(token), this.courseService, {courseid: courseid});
		return resp;
	}

	@Delete('course/:courseid')
	@ApiOperation({ summary: '刪除組合資料', description: '刪除組合資料'})
	@ApiParam({name:'courseid', description:'球道組合代號'})
	@ApiResponse({status: 200, description:'刪除組合回傳物件', type: commonResponse})
	async delete(@Param('courseid') courseid:string, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await deleteTableData(String(token), this.courseService, {courseid: courseid});
		return resp;
	}

	@Post('course')
	@ApiOperation({ summary: '回傳球道組合資料', description: '回傳球道組合資料'})
	@ApiBody({description: '查詢球道組合', type: queryCoursesRequest, examples: queryCoursesRequestEx})
	@ApiResponse({status: 200, description:'球道組合回傳物件', type: coursesResponse})
	async query(@Body() body:Partial<courses>, @Headers('WWW-AUTH') token:Record<string, string>){
		const resp = await queryTable(String(token), this.courseService, body);
		return resp;
	}
}