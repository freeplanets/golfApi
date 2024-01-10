import { InjectModel, Model } from "nestjs-dynamoose";
import defaultService from "../common/defaultService";
import { titleRanking, trKey } from "../db.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class TitleRanking extends defaultService<titleRanking, trKey>  {
    constructor(
        @InjectModel('TitleRanking')
        titleRankModel:Model<titleRanking, trKey>
    ){
        super(titleRankModel);
    }
}