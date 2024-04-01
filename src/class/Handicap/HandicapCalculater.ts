import { handicapHistory, player } from "../../database/db.interface";
import HandicapHistory from "./HandicapHistory";
import HandicapLevel, { DOBULE_BOGGY } from "./HandicapLevel";

export default class HandicapCalculater {
    private history = new HandicapHistory();
    private hcpLvl = new HandicapLevel();
    constructor(history?:handicapHistory[]) {
        if (history) {
            this.history.History = history;
        }
    }
    addScore(playerScore:player, gameid:string, rating:number, slope:number){
        let gross = 0;
        let grossAdjusted = 0;
        const hcp = this.history.Handicap;
        const handicap = this.hcpLvl.checkHandicap(hcp);
        // console.log('handicap:', hcp, handicap);
        if (slope < 100) slope = 134;
        playerScore.holes.forEach((score) => {
            let hcp = handicap;
            if (hcp === DOBULE_BOGGY) {
                hcp = score.par + 2;
            }
            grossAdjusted += score.gross > hcp ? hcp : score.gross;
            gross += score.gross;
        });
        const tmp:handicapHistory = {
            gameid,
            memberName: playerScore.playerName,
            memberid: playerScore.extra.memberId,
            gross: gross,
            grossAfterAdjust: grossAdjusted,
            course: '',
            rating: rating,
            slope: slope,
            hcpDiff: 0,
            hcpAvg: 0,
            hcpField: 0,
            hcpIndex: 0,
        }
        this.history.add(tmp);
    }
    get CurHcpData() {
        return this.history.CurrectHcpData;
    }
}