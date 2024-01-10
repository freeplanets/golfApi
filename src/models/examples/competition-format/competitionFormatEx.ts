import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import CompetitionFormatModel from "../../../models/competition-format/CompetitionFormat";
import CFQuery from "../../../models/competition-format/CFQuery";

const cfEx = new CompetitionFormatModel();
cfEx.cfName = '貝利亞';
cfEx.hcpRate = 80;
cfEx.is579 = true;
cfEx.notCountingHoles = 6;

const cfQueryEx = new CFQuery();
cfQueryEx.cfName = '貝利亞';
cfQueryEx.is579 = true;

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