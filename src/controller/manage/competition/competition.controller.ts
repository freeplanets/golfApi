import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import commonResponse from '../../../models/common/commonResponse';
import { commonRes, commonResWithData } from '../../../models/if';
import { ErrCode } from '../../../models/enumError';
import GTResGet from '../../../models/competition/CompetitionResGet';
import { competition } from '../../../database/db.interface';
import GTResQuery from '../../../models/competition/CompetitionResQuery';
import CompetitionService from '../../../database/competition/Competition.service';
import { competitionEx, competitionQueryEx, competitionUpdateEx, updateCompetitionEx } from '../../../models/examples/competition/competitionEx';
import CompetitionModel from '../../../models/competition/CompetitionModel';
import CompetitionQueryRequest from '../../../models/competition/CompetitionQueryRequest';


@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/competition')
export default class CompetitionController {
    constructor(
        private readonly competitionService: CompetitionService
    ){}

    @Put()
    @ApiOperation({summary:'新增賽事', description:'新增賽事'})
    @ApiBody({description:'賽事資料', type: CompetitionModel, examples: competitionEx})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    addGameTitle(){
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;
    }

    @Patch(':titleid')
    @ApiOperation({summary:'修改賽事', description:'修改賽事'})
    @ApiParam({name:'titleid', description: '賽事代號'})
    @ApiBody({description:'賽事資料', type: CompetitionModel, examples: competitionUpdateEx})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    updateGameTitle(){
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;        
    }

    @Delete(':titleid')
    @ApiOperation({summary:'刪除賽事', description:'刪除賽事'})
    @ApiParam({name: 'titleid', description: '賽事代號'})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    deleteGameTitle(@Param('titleid') titleid:string){
        console.log('delete game title', titleid);
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;        
    }

    @Get(':titleid')
    @ApiOperation({summary: '依代號取得賽事', description: '依代號取得賽事'})
    @ApiParam({name: 'titleid', description: '賽事代號'})
    @ApiResponse({status: 200, description: '回傳物件', type: GTResGet })
    getGameTitle(@Param('titleid') titleid:string){
        const resp:commonResWithData<competition> = {
            errcode: ErrCode.OK,
            data: updateCompetitionEx,
        }
        return resp;
    }

    @Post()
    @ApiOperation({summary: '查詢賽事', description: '查詢賽事'})
    @ApiBody({description: '賽事代號', type: CompetitionQueryRequest, examples: competitionQueryEx })
    @ApiResponse({status: 200, description: '回傳物件', type: GTResQuery })
    queryGameTitle(){
        const resp:commonResWithData<competition[]> = {
            errcode: ErrCode.OK,
            data: [updateCompetitionEx],
        }
        return resp;
    }
}
