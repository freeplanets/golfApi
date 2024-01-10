import { score } from "../../database/db.interface";
import { AreaType } from "../../models/enum";
import AreaScoreHolder from "./areaScoreHolder";

export default class AreaScoreCreator {
    private datas:AreaScoreHolder[];
    constructor() {
        this.datas = Object.keys(AreaType).map((key) => new AreaScoreHolder(AreaType[key]));
    }
    addHoleScore(h:score){
        this.datas.forEach((data) => data.addScore(h));
    }
    get Score() {
        return this.datas.map((data) => data.Score);
    }
}