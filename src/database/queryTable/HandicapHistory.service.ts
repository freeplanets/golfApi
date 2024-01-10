import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { handicapHistory, mbrIdKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class HandicapHistoryService extends defaultService<handicapHistory, mbrIdKey> {
    constructor(
        @InjectModel('HandicapHistory')
        handcapHistoryModel:Model<handicapHistory, mbrIdKey>
    ){
        super(handcapHistoryModel);
    }
}