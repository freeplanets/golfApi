import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Response } from '@nestjs/common';
import CompetitionFormatService from '../../../database/competition-format/CompetitionFormat.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import CompetitionFormatModel from '../../../models/competition-format/CompetitionFormatModel';
import { CFEx, CFQueryEx, cfEx } from '../../../models/examples/competition-format/competitionFormatEx';
import commonResponse from '../../../models/common/commonResponse';
import { cfKey, competitionFormat, platformUser } from '../../../database/db.interface';
import CFResGet from '../../../models/competition-format/CFResGet';
import CFResQuery from '../../../models/competition-format/CFResQuery';
import CFQuery from '../../../models/competition-format/CFQuery';
import { createTableData, deleteTableData, getTableData, hashKey, queryTable, updateTableData } from '../../../function/Commands';

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/competition-format')
export default class CompetitionFormatController {
    constructor(
        private readonly competitionFormatService:CompetitionFormatService,
    ){}

    @Put('')
    @ApiOperation({summary:'新增賽制', description:'新增賽制'})
    @ApiBody({description: '賽制資料', type: CompetitionFormatModel, examples: CFEx })
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    async addCompetitionFormat(@Body() body:competitionFormat, @Response({passthrough: true}) res:any ){
        /*
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        */
        body.cfid = hashKey();
        const resp = await createTableData(res.locals.user, this.competitionFormatService, body);
        return resp;        
    }

    @Patch(':cfid')
    @ApiOperation({summary:'修改賽制', description:'修改賽制'})
    @ApiParam({name: 'cfid', description:'賽制代號'})
    @ApiBody({description: '賽制資料', type: CompetitionFormatModel, examples: CFEx})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    async updateCompetitionFormat(@Param('cfid') cfid:string, @Body() body:competitionFormat, 
        @Response({passthrough: true}) res:any){
        console.log('updateCompetitionFormat', cfid);
        /*
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        */
        if (body.cfid) delete body.cfid;
        const resp = await updateTableData(res.locals.user, this.competitionFormatService, body, {cfid} as cfKey);
        return resp;
    }

    @Get(':cfid')
    @ApiParam({name: 'cfid', description:'賽制代號'})
    @ApiOperation({summary:'取得賽制', description:'取得賽制'})
    @ApiResponse({status: 200, description: '回傳物件', type: CFResGet })
    async getCompetitionFormat(@Response({passthrough:true}) res:any,@Param('cfid') cfid:string){
        /*
        const resp:commonResWithData<competitionFormat> = {
            errcode: ErrCode.OK,
            data: cfEx,
        }
        */
        const resp = await getTableData(res.locals.user, this.competitionFormatService, {cfid} as cfKey)
        // res.send(JSON.stringify(resp));
        return resp;
    }

    @Delete(':cfid')
    @ApiParam({name: 'cfid', description:'賽制代號'})
    @ApiOperation({summary: '刪除賽制', description:'刪除賽制'})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    async deleteCompetitionFormat(@Param('cfid') cfid:string, @Response({passthrough: true}) res:any){
        console.log('deleteCompetitionForamt', cfid);
        /*
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        */
        const resp = await deleteTableData(res.locals.user, this.competitionFormatService, {cfid} as cfKey);
        return resp;
    }

    @Post('')
    @ApiOperation({summary:'查詢賽制', description:'查詢賽制'})
    @ApiBody({description:'查詢參數', type: CFQuery, examples: CFQueryEx})
    @ApiResponse({status: 200, description: '回傳物件', type: CFResQuery })
    async queryCompetitionFormat(@Body() body:CFQuery, @Response({passthrough:true}) res:any){
        console.log('queryCompetitionFormat', body);
        /*
        const resp:commonResWithData<competitionFormat[]> = {
            errcode: ErrCode.OK,
            data: [cfEx],
        }
        */
        const resp = await queryTable(res.locals.user, this.competitionFormatService, body);
        return resp;        
    }
}
