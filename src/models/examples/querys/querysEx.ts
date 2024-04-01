import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import CompetitionRankingQueryModel from "../../querys/CompetitionRankingQueryModel";
import MembersQueryModel from "../../querys/MembersQueryModel";
import { membersHcp } from "../../../database/db.interface";
import { commonResWithData } from "../../../models/if";
import { ErrCode } from "../../../models/enumError";

const competitionRankingQueryEx = new CompetitionRankingQueryModel();
competitionRankingQueryEx.titleName = '林口杯錦標賽';
competitionRankingQueryEx.siteid = 'linkougolf';

const membersQueryEx = new MembersQueryModel();
membersQueryEx.siteid = 'linkougolf';
membersQueryEx.memberid = 'M00019';

const memberEx:membersHcp = {
    memberid: 'M0001',
    memberName: '李大大',
    lastHandicap: 10,
}
const membersEx = [memberEx];

export const mbrResEx:commonResWithData<Partial<membersHcp>[]> = {
    errcode: ErrCode.OK,
    data: membersEx,
}

export const CRQueryEx:Record<'Request', ExampleObject> = {
    Request: {
        value: competitionRankingQueryEx
    }
}

export const MbrQueryEx:Record<'Request', ExampleObject> = {
    Request: {
        value: membersQueryEx,
    }
}

