import { gameResultReq } from "src/models/if";
import MyDate from "../../../class/common/MyDate";
import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

const req:gameResultReq = {
    siteid: 'linkougolf',
    dateStart: MyDate.dayDiff(7),
    dateEnd: MyDate.dayDiff(0),
    playerName: 'player001',
    gameTitle: '合眾',
}

export const gameRequestReqEx:Record<'Request', ExampleObject> = {
    Request: {
        value: req,
    }
}