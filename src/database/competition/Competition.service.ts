import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { competition, titleKey } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";

@Injectable()
export default class CompetitionService extends defaultService<competition, titleKey> {
    constructor(
        @InjectModel('Competition')
        gameTitleModel:Model<competition, titleKey>

    ){
        super(gameTitleModel);
    }
}