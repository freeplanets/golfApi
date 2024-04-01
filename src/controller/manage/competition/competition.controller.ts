import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Response } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import commonResponse from '../../../models/common/commonResponse';
import { ErrCode } from '../../../models/enumError';
import GTResGet from '../../../models/competition/CompetitionResGet';
import { competition, notCountingHole, titleKey } from '../../../database/db.interface';
import GTResQuery from '../../../models/competition/CompetitionResQuery';
import CompetitionService from '../../../database/competition/Competition.service';
import { competitionEx, competitionQueryEx, competitionUpdateEx, updateCompetitionEx } from '../../../models/examples/competition/competitionEx';
import CompetitionModel from '../../../models/competition/CompetitionModel';
import CompetitionQueryRequest from '../../../models/competition/CompetitionQueryRequest';
import { createTableData, deleteEmptyMember, deleteTableData, getTableData, hashKey, queryTable, updateTableData } from '../../../function/Commands';
import ZonesService from '../../../database/zone/zones.service';
import CompetitionFormatVerify from '../../../class/CompetitionFormat/CompetitionFormatVerify';
import { CompetitionFormatName, CompetitionFormatType } from '../../../models/enum';
import { errorMsg } from '../../../function/Errors';

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/competition')
export default class CompetitionController {
    constructor(
        private readonly competitionService: CompetitionService,
        private readonly zoneService: ZonesService,
    ){}

    @Put()
    @ApiOperation({summary:'新增賽事', description:'新增賽事'})
    @ApiBody({description:'賽事資料', type: CompetitionModel, examples: competitionEx})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    async addCompetition(@Body() body:competition, @Response({passthrough:true}) res:any){
        /*
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        */
        if (!body.titleid) body.titleid = hashKey();
        const resp = await createTableData(res.locals.user, this.competitionService, body);
        return resp;
    }

    @Patch(':titleid')
    @ApiOperation({summary:'修改賽事', description:'修改賽事'})
    @ApiParam({name:'titleid', description: '賽事代號'})
    @ApiBody({description:'賽事資料', type: CompetitionModel, examples: competitionUpdateEx})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    async updateCompetition(@Param('titleid') titleid:string, @Body() body:competition, 
        @Response({passthrough:true}) res:any):Promise<commonResponse> {
        /*
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        */
        if (body.cfType && !body.cfName) {
            body.cfName = CompetitionFormatName[body.cfType];
        }
        if (body.titleid) delete body.titleid;
        if (body.notCountingHoles) {
            const checkNoCount = await this.checkNotCountingHoles(body, titleid);
            if (!checkNoCount) {
                return {
                    errcode: ErrCode.ERROR_PARAMETER,
                    error: {
                        message: errorMsg('ERROR_PARAMETER', 'notCountingHoles'),
                    }
                }
            }
        }
        const resp = await updateTableData(res.locals.user, this.competitionService, body, {titleid} as titleKey);
        return resp;        
    }

    @Delete(':titleid')
    @ApiOperation({summary:'刪除賽事', description:'刪除賽事'})
    @ApiParam({name: 'titleid', description: '賽事代號'})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    async deleteCompetition(@Param('titleid') titleid:string, @Response({passthrough:true}) res:any){
        console.log('delete game title', titleid);
        /*
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        */
        const resp = await deleteTableData(res.locals.user, this.competitionService, {titleid} as titleKey);
        return resp;        
    }

    @Get(':titleid')
    @ApiOperation({summary: '依代號取得賽事', description: '依代號取得賽事'})
    @ApiParam({name: 'titleid', description: '賽事代號'})
    @ApiResponse({status: 200, description: '回傳物件', type: GTResGet })
    async getCompetition(@Param('titleid') titleid:string, @Response({passthrough:true}) res:any){
        /*
        const resp:commonResWithData<competition> = {
            errcode: ErrCode.OK,
            data: updateCompetitionEx,
        }
        */
        const resp = await getTableData(res.locals.user, this.competitionService, {titleid} as titleKey)
        return resp;
    }

    @Post()
    @ApiOperation({summary: '查詢賽事', description: '查詢賽事'})
    @ApiBody({description: '賽事代號', type: CompetitionQueryRequest, examples: competitionQueryEx })
    @ApiResponse({status: 200, description: '回傳物件', type: GTResQuery })
    async queryCompetition(@Body() body:CompetitionQueryRequest, @Response({passthrough:true}) res:any){
        /*
        const resp:commonResWithData<competition[]> = {
            errcode: ErrCode.OK,
            data: [updateCompetitionEx],
        }
        */
        deleteEmptyMember(body);
        const resp = await queryTable(res.locals.user, this.competitionService, body);
        return resp;
    }

    async checkNotCountingHoles(data:competition, titleid:string){
        const zones = await this.zoneService.findAll();
        const newNC:notCountingHole[] = []
        data.notCountingHoles.forEach((nc) => {
            const f = zones.find((itm) => itm.zoneid === nc.zoneid);
            if (f) {
                const pars:number[] = [];
                nc.fairways.forEach((no) => {
                    const fno = f.fairways.find((fa) => fa.fairwayno === no);
                    if (fno) {
                        pars.push(fno.par);
                    }
                });
                newNC.push({
                    zoneid: nc.zoneid,
                    fairways: nc.fairways,
                    pars,
                })
            }
        });
        let cfType = data.cfType;
        if (!cfType) {
            const chkComp = await this.competitionService.findOne({titleid});
            cfType = chkComp.cfType
        }
        if (cfType) {
            const cpcheck = new CompetitionFormatVerify();
            return cpcheck.verify(newNC, cfType as CompetitionFormatType);
        } else {
            return false;
        }
    }
}
