import { Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import GameTitleService from '../../../database/game-title/GameTitle.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import GameTitleModel from '../../../models/game-title/GameTitleModel';
import commonResponse from '../../../models/common/commonResponse';
import { gameTitleEx, gameTitleQueryEx, gameTitleUpdateEx, updateGameTitleEx } from '../../../models/examples/game-title/gameTitleEx';
import { commonRes, commonResWithData } from '../../../models/if';
import { ErrCode } from '../../../models/enumError';
import GTResGet from '../../../models/game-title/GTResGet';
import { gameTitle } from '../../../database/db.interface';
import GTResQuery from '../../../models/game-title/GTResQuery';
import GTQuery from '../../../models/game-title/GTQuery';

@ApiBearerAuth()
@ApiTags('Manage')
@Controller('manage/game-title')
export default class GameTitleController {
    constructor(
        private readonly gameTitleService:GameTitleService
    ){}

    @Put()
    @ApiOperation({summary:'新增賽事', description:'新增賽事'})
    @ApiBody({description:'賽事資料', type: GameTitleModel, examples: gameTitleEx})
    @ApiResponse({status: 200, description: '回傳物件', type: commonResponse })
    addGameTitle(){
        const resp:commonRes = {
            errcode: ErrCode.OK,
        }
        return resp;
    }

    @Patch()
    @ApiOperation({summary:'修改賽事', description:'修改賽事'})
    @ApiBody({description:'賽事資料', type: GameTitleModel, examples: gameTitleUpdateEx})
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
        const resp:commonResWithData<gameTitle> = {
            errcode: ErrCode.OK,
            data: updateGameTitleEx,
        }
        return resp;
    }

    @Post()
    @ApiOperation({summary: '查詢賽事', description: '查詢賽事'})
    @ApiBody({description: '賽事代號', type: GTQuery, examples: gameTitleQueryEx })
    @ApiResponse({status: 200, description: '回傳物件', type: GTResQuery })
    queryGameTitle(){
        const resp:commonResWithData<gameTitle[]> = {
            errcode: ErrCode.OK,
            data: [updateGameTitleEx],
        }
        return resp;
    }
}
