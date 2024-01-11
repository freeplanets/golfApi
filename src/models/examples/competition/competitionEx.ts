import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import NotCountingHoles from "../../competition/NotCountingHolesModel";
import GTQuery from "../../competition/CompetitionQueryRequest";
import CompetitionModel from "../../../models/competition/CompetitionModel";

const newCompetition = new CompetitionModel();
newCompetition.titleName = 'GameTitle';
newCompetition.gameStart = '2024-1-10';
newCompetition.gameEnd = '2024-1-12';
newCompetition.cfid = 'competitionformatid';
newCompetition.cfName = 'CFName';
newCompetition.grossCounter = 5;
newCompetition.netCounter = 5;
newCompetition.competitionLocation = 'linkougolf';

const updateCompetitionEx = Object.assign({}, newCompetition);
const notCount = new NotCountingHoles();
notCount.zoneid = 'zonehashkey';
notCount.fairways = [2, 5, 7];
updateCompetitionEx.notCountingHoles = [notCount];

const gtQueryEx = new GTQuery();
gtQueryEx.titleName = 'TitleName';
gtQueryEx.cfName = 'CFName';
gtQueryEx.gameStart = '2024-1-10';
gtQueryEx.gameEnd = '2024-1-12';

export const competitionEx:Record<'Request', ExampleObject> = {
    Request: {
        value: newCompetition,
    }
} 

export const competitionUpdateEx:Record<'Request', ExampleObject> = {
    Request: {
        value: updateCompetitionEx,
    }
}

export const competitionQueryEx:Record<'Request', ExampleObject> = {
    Request: {
        value: gtQueryEx,
    }
}
export { updateCompetitionEx }

