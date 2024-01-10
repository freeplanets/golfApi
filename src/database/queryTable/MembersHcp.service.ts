import { Injectable } from "@nestjs/common";
import defaultService from "../common/defaultService";
import { mbrIdKey, membersHcp } from "../db.interface";
import { InjectModel, Model } from "nestjs-dynamoose";


@Injectable()
export default class MembersHcpService extends defaultService<membersHcp, mbrIdKey> {
    constructor(
        @InjectModel('MembersHcp')
        membersHcpService:Model<membersHcp, mbrIdKey>
    ){
        super(membersHcpService);
    }
}