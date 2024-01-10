import { ExampleObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { ksGameNew } from "../ks.interface";

const gameEx:ksGameNew = {
    key: "F8FTwpKuMD3IIeMXH4Tn8Nc2ukKVl21q",
    group_no: "26",
    areas: ["東", "南"],
    caddie: ["001", "002"],
    player: ["丁大＊", "于祖＊", "大平＊", "土田＊"],
    player_id: ["1001", "1002", "1003", "1004"],
    team: "吉祥球隊",
    team_id: "1201"    
}

export const ksGameEx:Record<'Request', ExampleObject> = {
    Request: {
        value: gameEx,
    },
}