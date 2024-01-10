import { InjectModel, Model } from "nestjs-dynamoose";
import defaultService from "../common/defaultService";
import { playerResult, siteKey } from "../db.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class PlayerResultService extends defaultService<playerResult, siteKey> {
    constructor(
        @InjectModel('PlayerResult')
        playerResultModel:Model<playerResult, siteKey>
    ){
        super(playerResultModel)
    }
}