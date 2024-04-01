import { InjectModel, Model } from "nestjs-dynamoose";
import defaultService from "../common/defaultService";
import { competitionRanking, trKey } from "../db.interface";
import { Injectable } from "@nestjs/common";
import { SortOrder } from "dynamoose/dist/General";

@Injectable()
export default class CompetitionRankingService extends defaultService<competitionRanking, trKey>  {
    constructor(
        @InjectModel('CompetitionRanking')
        titleRankModel:Model<competitionRanking, trKey>
    ){
        super(titleRankModel);
    }
}