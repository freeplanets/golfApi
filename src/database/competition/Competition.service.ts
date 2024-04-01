import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { competition, titleKey } from "../db.interface";
import { InjectModel, Item, Model, QueryResponse } from "nestjs-dynamoose";
import { ConditionInitializer } from "dynamoose/dist/Condition";
import { Condition } from "dynamoose";

@Injectable()
export default class CompetitionService extends defaultService<competition, titleKey> {
    constructor(
        @InjectModel('Competition')
        competitionModel:Model<competition, titleKey>,
    ){
        super(competitionModel);
    }
    query(key: ConditionInitializer | Partial<competition>, field?: string[], index?: string): Promise<QueryResponse<Item<competition>>> {
        if ((key as Partial<competition>).titleName) {
            const titleName = (key as Partial<competition>).titleName;           
            const cond = new Condition().where('titleName').contains(titleName);
            if ((key as Partial<competition>).siteid) {
                cond.and().where('siteid').eq((key as Partial<competition>).siteid);
            }
            key = cond;
        }
        return super.query(key, field, index);
    }    
}