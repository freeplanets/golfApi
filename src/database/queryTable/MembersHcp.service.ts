import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { mbrIdKey, membersHcp } from "../db.interface";
import { InjectModel, Item, Model, QueryResponse } from "nestjs-dynamoose";
import { Condition } from "dynamoose";
import { ConditionInitializer } from "dynamoose/dist/Condition";

@Injectable()
export default class MembersHcpService extends defaultService<membersHcp, mbrIdKey> {
    constructor(
        @InjectModel('MembersHcp')
        membersHcpService:Model<membersHcp, mbrIdKey>
    ){
        super(membersHcpService);
    }
    query(key: Partial<membersHcp> | ConditionInitializer, field?: string[], index?: string): Promise<QueryResponse<Item<membersHcp>>> {
        // console.log('mh query', key);
        if ((key as Partial<membersHcp>).memberName) {
            const memberName = (key as Partial<membersHcp>).memberName;           
            const cond = new Condition().where('memberName').contains(memberName);
            if ((key as Partial<membersHcp>).siteid) {
                cond.and().where('siteid').eq((key as Partial<membersHcp>).siteid);
            }
            key = cond;
        }
        return super.query(key, field, index);
    }
    async create(data: membersHcp): Promise<membersHcp> {
        return this.AddOrUpdate(data);    
    }
    private async AddOrUpdate(mHcp:membersHcp){
        const key:mbrIdKey = {
            memberid: mHcp.memberid,
            siteid: mHcp.siteid,        }
        const chk = await super.query(key);
        if (chk.count > 0) {
            const data:Partial<membersHcp> = {
                lastHandicap: mHcp.lastHandicap,
            }
            return super.update(key, data);
        } else {
            return super.create(mHcp);
        }
    }
}