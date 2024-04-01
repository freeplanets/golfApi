import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import NotCountingHoles from "../../competition/NotCountingHolesModel";
import GTQuery from "../../competition/CompetitionQueryRequest";
import CompetitionModel from "../../../models/competition/CompetitionModel";

const newCompetition = new CompetitionModel();
newCompetition.siteid = 'linkougolf';
newCompetition.titleName = 'GameTitle';
newCompetition.gameStart = '2024-1-10';
newCompetition.gameEnd = '2024-1-12';
newCompetition.cfid = '53tngIHsF09ZNdYHZXpKL4';
newCompetition.cfName = 'CFName';
newCompetition.grossCounter = 5;
newCompetition.netCounter = 5;
newCompetition.competitionLocation = 'linkougolf';

const updateCompetitionEx = Object.assign({}, newCompetition);
const notCount1 = new NotCountingHoles();
notCount1.zoneid = '6StRT5EtN4gDUlXNG5ULb7';    // West
notCount1.fairways = [1, 2, 3];
const notCount2 = new NotCountingHoles();
notCount2.zoneid = '0NWLEbt47QhFdpYHg1Znth';    // East
notCount2.fairways = [1, 2, 3];
const notCount3 = new NotCountingHoles();
notCount3.zoneid = '1hFFpgpzldz2jn5sR1mzWV';    // South
notCount3.fairways = [4, 5, 6];
updateCompetitionEx.notCountingHoles = [notCount1, notCount2, notCount3];

const gtQueryEx = new GTQuery();
gtQueryEx.siteid = 'linkougolf';
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

