import { handicapHistory } from "../../database/db.interface";

const PGA_INDEX = 113;
const INDEX_RATE = 0.96

export default class HandicapHistory {
    private history:handicapHistory[] = [];
    private curHcpData:Partial<handicapHistory> = {};
    private curHcp = 0;
    add(data:handicapHistory) {
        data.hcpDiff = this.oneDecimalPoint(((data.grossAfterAdjust - data.rating) * PGA_INDEX)/data.slope);
        if (this.history.length > 3) {
            data.hcpAvg = this.avgWithLast(data.hcpDiff);
            data.hcpIndex = this.oneDecimalPoint(data.hcpAvg * INDEX_RATE);
            data.hcpField = this.oneDecimalPoint((data.hcpIndex * data.slope)/PGA_INDEX);
            this.curHcp = data.hcpField;
        }
        this.curHcpData = data;
        this.history.push(data);
    }
    set History(history:handicapHistory[]) {
        this.history = history;
    }
    private oneDecimalPoint(n:any) {
        if (typeof(n) !== 'number') {
            n = parseFloat(n);
        }
        return Math.round(n*10)/10;
    }
    private avgWithLast(hcpDiff:number, count = 10) {
        let total = hcpDiff;
        let start = 0;
        if (this.history.length > count) {
            start = this.history.length - count;
        }
        const tmp:number[]=[];
        for(let i = start; i< this.history.length; i+=1) {
            total += this.history[i].hcpDiff;
            tmp.push(this.history[i].hcpDiff);
        }
        console.log('avgWithLast', total, count, this.history.length, '=>', tmp.join(","));
        return this.oneDecimalPoint(total/(this.history.length + 1));
    }
    get List() {
        return this.history;
    }
    get CurrectHcpData() {
        return this.curHcpData;
    }
    get Handicap() {
        return this.curHcp;
    }
}