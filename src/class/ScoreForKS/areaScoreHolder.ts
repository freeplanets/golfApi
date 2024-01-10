import { score } from "../../database/db.interface";
import { AreaScore } from "../../models/transData/ks/ks.interface";
import { AreaType } from "../../models/enum";

export default class AreaScoreHolder {
    private data:AreaScore;
    constructor(area:string){
        this.data = {
            area,
            score1:0,
            score2:0,
            score3:0,
            score4:0,
            score5:0,
            score6:0,
            score7:0,
            score8:0,
            score9:0,
            total:0,
        }
    }
    addScore(s:score) {
        if (this.data.area === AreaType.OUT) {
            if (s.holeNo > 9) return;
        } else {
            if (s.holeNo < 10) return; 
        }
        this.data[`score${s.fairwayno}`] = s.gross;
        this.data.total += s.gross;
    }
    get Score() {
        return this.data;
    }
}