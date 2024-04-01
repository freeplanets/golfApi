import { Body, Controller, Get, Param, Post, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import CompetitionRankingService from '../../../database/queryTable/CompetitionRanking.service';
import HandicapHistoryService from '../../../database/queryTable/HandicapHistory.service';
import MembersHcpService from '../../../database/queryTable/MembersHcp.service';
import CompetitionRankingQueryModel from '../../../models/querys/CompetitionRankingQueryModel';
import { CRQueryEx, MbrQueryEx } from '../../../models/examples/querys/querysEx';
//import { commonResWithData } from '../../../models/if';
import { handicapHistory, mbrIdKey, membersHcp } from '../../../database/db.interface';
//import { ErrCode } from '../../../models/enumError';
import mbrResModel from '../../../models/querys/mbrResModel';
import CompetitionRankingResModel from '../../../models/querys/CompetitionRankingResModels';
import HcpHistoryResModel from '../../../models/querys/HcpHistoryResModel';
import MembersQueryModel from '../../../models/querys/MembersQueryModel';
import { deleteEmptyMember, queryTable } from '../../../function/Commands';

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
    async queryRanking(@Body() body:CompetitionRankingQueryModel, @Response({passthrough: true}) res:any ){
        deleteEmptyMember(body);
        // await this.deleteAllRankData();
        const resp = await queryTable(res.locals.user, this.competitionRankingService, body)
        // :commonResWithData<Partial<competitionRanking>[]> = {
        //     errcode: ErrCode.OK,
        //     data: []
        // }
        return resp;
    }

    @Post('members')
    @ApiOperation({summary:'查詢會員', description: '查詢會員'})
    @ApiBody({description: '查詢條件', type: MembersQueryModel, examples: MbrQueryEx})
    @ApiResponse({status: 200, type: mbrResModel })
    async queryMembers(@Body() body:MembersQueryModel, @Response({passthrough: true}) res:any ){
        deleteEmptyMember(body);
        const resp = await queryTable(res.locals.user, this.membersHcpService, body);
        // :commonResWithData<Partial<membersHcp>[]> = {
        //     errcode: ErrCode.OK,
        //     data: [],
        // }
        return resp;
    }

    @Post('memberHcp')
    @ApiOperation({summary:'查詢會員差點', description: '查詢會員差點'})
    @ApiBody({description: '查詢條件', type: MembersQueryModel, examples: MbrQueryEx})    
    @ApiResponse({status: 200, type: HcpHistoryResModel})
    async queryMembersHcp(@Body() body:mbrIdKey, @Response({passthrough: true}) res:any ){
        // await this.updateAllHH();
        // await this.deleteAllHH();
        const resp = await queryTable<handicapHistory, mbrIdKey>(res.locals.user, this.handicapHistoryService, body);
        resp.data = resp.data.sort((a:handicapHistory, b:handicapHistory) => a.createdAt - b.createdAt);
        // :commonResWithData<Partial<handicapHistory>[]> = {
        //     errcode: ErrCode.OK,
        //     data: [],
        // }
        return resp;
    }

    async deleteAllRankData() {
        const ans = await this.competitionRankingService.findAll();
        for (let i = 0; i < ans.length; i++) {
            await this.competitionRankingService.delete({trid: ans[i].trid});
        }
    }
    async deleteAllHH() {
        const ans = await this.handicapHistoryService.findAll();
        for(let i=0; i < ans.length; i++) {
            await this.handicapHistoryService.delete({hhid: ans[i].hhid});
        }
    }
    async updateAllHH() {
        const ans = await this.handicapHistoryService.findAll();
        for(let i=0; i < ans.length; i++) {
            await this.handicapHistoryService.update({hhid: ans[i].hhid}, {unCalcMark: false});
        }
    }
}
