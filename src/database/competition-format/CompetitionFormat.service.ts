import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { cfKey, competitionFormat } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class CompetitionFormatService extends defaultService<competitionFormat, cfKey> {
    constructor(
        @InjectModel('CompetitionFormat')
        competitionFormatModel:Model<competitionFormat, cfKey>
    ){
        super(competitionFormatModel);
    }
}