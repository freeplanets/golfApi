import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import CompetitionFormatModel from "../../competition-format/CompetitionFormatModel";
import CFQuery from "../../../models/competition-format/CFQuery";
import { CompetitionFormatType } from "../../../models/enum";

const cfEx = new CompetitionFormatModel();
cfEx.cfName = '新貝利亞';
cfEx.cfType = CompetitionFormatType.NEW_PEORIA;

const cfQueryEx = new CFQuery();
cfQueryEx.cfName = '新貝利亞';

export const CFEx:Record<'Request', ExampleObject> = {
    Request: {
        value: cfEx,
    }
}
export const CFQueryEx:Record<'Request', ExampleObject> = {
    Request: {
        value: cfQueryEx,
    }
}
export { cfEx };