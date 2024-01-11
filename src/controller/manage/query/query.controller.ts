import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import CompetitionRankingService from '../../../database/queryTable/CompetitionRanking.service';
import HandicapHistoryService from '../../../database/queryTable/HandicapHistory.service';
import MembersHcpService from '../../../database/queryTable/MembersHcp.service';
import CompetitionRankingQueryModel from '../../../models/querys/CompetitionRankingQueryModel';
import { CRQueryEx, MbrQueryEx } from '../../../models/examples/querys/querysEx';
import { commonResWithData } from '../../../models/if';
import { competitionRanking, handicapHistory, membersHcp } from '../../../database/db.interface';
import { ErrCode } from '../../../models/enumError';
import mbrResModel from '../../../models/querys/mbrResModel';
import CompetitionRankingResModel from '../../../models/querys/CompetitionRankingResModels';
import HcpHistoryResModel from '../../../models/querys/HcpHistoryResModel';
import MembersQueryModel from '../../../models/querys/MembersQueryModel';

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/query')
export class QueryController {
    constructor(
        private readonly membersHcpService: MembersHcpService,
        private readonly handicapHistoryService: HandicapHistoryService,
        private readonly competitionRankingService: CompetitionRankingService,
    ){}

    @Post('ranking')
    @ApiOperation({summary:'查詢賽事排名', description: '查詢賽事排名'})
    @ApiBody({description: '查詢條件', type: CompetitionRankingQueryModel, examples: CRQueryEx})
    @ApiResponse({status: 200, type: CompetitionRankingResModel})
    queryRanking(@Body() body:CompetitionRankingQueryModel){
        const resp:commonResWithData<Partial<competitionRanking>[]> = {
            errcode: ErrCode.OK,
            data: []
        }
        return resp;
    }

    @Post('members')
    @ApiOperation({summary:'查詢會員', description: '查詢會員'})
    @ApiBody({description: '查詢條件', type: MembersQueryModel, examples: MbrQueryEx})
    @ApiResponse({status: 200, type: mbrResModel })
    queryMembers(@Body() body:MembersQueryModel){
        const resp:commonResWithData<Partial<membersHcp>[]> = {
            errcode: ErrCode.OK,
            data: [],
        }
        return resp;
    }

    @Get('memberHcp/:memberid')
    @ApiOperation({summary:'查詢會員差點', description: '查詢會員差點'})
    @ApiParam({name: 'memberid', description:'會員編號'})
    @ApiResponse({status: 200, type: HcpHistoryResModel})
    queryMembersHcp(@Param('memberid') memberid:string){
        const resp:commonResWithData<Partial<handicapHistory>[]> = {
            errcode: ErrCode.OK,
            data: [],
        }
        return resp;
    }
}
