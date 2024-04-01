import { notCountingHole, score } from "../../database/db.interface";

export default class ScoreCalculater {
    private total = 0;
    private subTotal = 0;
    private PAR = 0
    constructor(private notCountingHoles:notCountingHole[]=[], private is579 = true){}
    process(scores:score[]){
        this.subTotal = 0;
        this.total = 0;
        this.PAR = 0;
        scores.forEach((score) => {
            this.PAR += score.par;
            const noCounting = this.notCountingHoles.some((zone)=> zone.zoneid === score.zoneid && 
                zone.fairways.some((no) => no === score.fairwayno));
            if (!noCounting) this.subTotal += this.Score(score);
            this.total += score.gross;
        });
        return this.total;
    }
    get Handicap() {
        return Math.round((this.subTotal * 1.5 - this.PAR)*0.8*10)/10;
    }
    get Net() {
        return this.total - this.Handicap;
    }
    private Score(score:score) {
        let result= score.gross;
        if (this.is579) {
            const topGross = score.par * 2 - 1;
            result = score.gross > topGross ? topGross : score.gross;
        }
        return result;
    }
}