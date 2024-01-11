import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Response } from '@nestjs/common';
import CompetitionFormatService from '../../../database/competition-format/CompetitionFormat.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import CompetitionFormatModel from '../../../models/competition-format/CompetitionFormatModel';
import { CFEx, CFQueryEx, cfEx } from '../../../models/examples/competition-format/competitionFormatEx';
import { commonRes, commonResWithData } from '../../../models/if';
import { ErrCode } from '../../../models/enumError';
import commonResponse from '../../../models/common/commonResponse';
import { competitionFormat, platformUser } from '../../../database/db.interface';
import CFResGet from '../../../models/competition-format/CFResGet';
import CFResQuery from '../../../models/competition-format/CFResQuery';
import CFQuery from '../../../models/competition-format/CFQuery';

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
    addCompetitionFormat(){
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;        
    }

    @Patch(':cfid')
    @ApiOperation({summary:'修改賽制', description:'修改賽制'})
    @ApiParam({name: 'cfid', description:'賽制代號'})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    updateCompetitionFormat(@Param('cfid') cfid:string){
        console.log('updateCompetitionFormat', cfid);
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;
    }

    @Get(':cfid')
    @ApiParam({name: 'cfid', description:'賽制代號'})
    @ApiOperation({summary:'取得賽制', description:'取得賽制'})
    @ApiResponse({status: 200, description: '回傳物件', type: CFResGet })
    getCompetitionFormat(@Response({passthrough:true}) res:any,@Param('cfid') cfid:string){
        console.log('user:', res.locals.user);
        cfEx.cfid = cfid;
        const resp:commonResWithData<competitionFormat> = {
            errcode: ErrCode.OK,
            data: cfEx,
        }
        // res.send(JSON.stringify(resp));
        return resp;
    }

    @Delete(':cfid')
    @ApiParam({name: 'cfid', description:'賽制代號'})
    @ApiOperation({summary: '刪除賽制', description:'刪除賽制'})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    deleteCompetitionFormat(@Param('cfid') cfid:string){
        console.log('deleteCompetitionForamt', cfid);
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;
    }

    @Post('')
    @ApiOperation({summary:'查詢賽制', description:'查詢賽制'})
    @ApiBody({description:'查詢參數', type: CFQuery, examples: CFQueryEx})
    @ApiResponse({status: 200, description: '回傳物件', type: CFResQuery })
    queryCompetitionFormat(@Body() body:CFQuery){
        console.log('queryCompetitionFormat', body);
        const resp:commonResWithData<competitionFormat[]> = {
            errcode: ErrCode.OK,
            data: [cfEx],
        }
        return resp;        
    }
}
