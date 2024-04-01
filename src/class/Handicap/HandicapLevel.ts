export const DOBULE_BOGGY = -1; // par +2

export default class HandicapLevel {
    constructor(private defaultHandicap = 10){}
    checkHandicap(hcp:number){
        if (hcp==0) {
            return this.defaultHandicap;
        } else if (hcp <=9) {
            return DOBULE_BOGGY;
        } else if (hcp >9 &&  hcp <= 19) {
            return 7;
        } else if (hcp >19 &&  hcp <= 29) {
            return 8;
        } else if (hcp >29 &&  hcp <= 39) {
            return 9;
        } 
        return this.defaultHandicap;
    }
}