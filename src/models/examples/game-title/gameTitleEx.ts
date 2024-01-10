import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import GameTitleModel from "../../../models/game-title/GameTitleModel";
import NotCountingHoles from "../../../models/game-title/NotCountingHoles";
import GTQuery from "../../../models/game-title/GTQuery";

const newGameTitle = new GameTitleModel();
newGameTitle.titleName = 'GameTitle';
newGameTitle.gameStart = '2024-1-10';
newGameTitle.gameEnd = '2024-1-12';
newGameTitle.cfid = 'competitionformatid';
newGameTitle.cfName = 'CFName';
newGameTitle.grossCounter = 5;
newGameTitle.netCounter = 5;
newGameTitle.competitionLocation = 'linkougolf';

const updateGameTitleEx = Object.assign({}, newGameTitle);
const notCount = new NotCountingHoles();
notCount.zoneid = 'zonehashkey';
notCount.fairways = [2, 5, 7];
updateGameTitleEx.notCountingHoles = [notCount];

const gtQueryEx = new GTQuery();
gtQueryEx.titleName = 'TitleName';
gtQueryEx.cfName = 'CFName';
gtQueryEx.gameStart = '2024-1-10';
gtQueryEx.gameEnd = '2024-1-12';

export const gameTitleEx:Record<'Request', ExampleObject> = {
    Request: {
        value: newGameTitle,
    }
} 

export const gameTitleUpdateEx:Record<'Request', ExampleObject> = {
    Request: {
        value: updateGameTitleEx,
    }
}

export const gameTitleQueryEx:Record<'Request', ExampleObject> = {
    Request: {
        value: gtQueryEx,
    }
}
export { updateGameTitleEx }

