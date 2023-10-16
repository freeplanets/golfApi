import * as fs from 'fs';
import GameScore from './GameScore';
import { IScoreSample } from '../class.if';
import SideGameScore from './SideGameScore';

let ss:IScoreSample;
let score:any[] = [];
let data:any[] = [];
let sgs:any[] = [];
let curTitle = '';
const rgl = new RegExp('player[0-9]');
function readfile() {
	const text = fs.readFileSync('./data/unitest_sample.csv', 'utf8').split('\r\n');
	text.every((itm) => {
		const dta = itm.split(',');
		if (dta[0]){
			if (curTitle === '') curTitle = dta[0];
			console.log(dta.join(","));
			if (dta[0] === 'player/game name') {
				ss = new GameScore();
			} else {
				if (!dta[4] || dta[4] === '1-6'){
					if (dta[0] !== curTitle && !dta[0].match(rgl)) {
						if (ss.hasData) {
							if (score.length === 0) score.push(ss.getData());
							else {
								data.push(ss.getData());
							}
						}
						// if(ss.hasData) data.push(ss.getData());
						if(ss.gameForm) sgs.push(ss.gameForm);
						curTitle = dta[0];
						ss = new SideGameScore(dta);
					}
				}
				ss.assignData(dta);
			}
			return true;
		}
		return true;
	});
	// if (gs) gs.showData();
}
readfile();
if (ss.hasData) data.push(ss.getData());
if (ss.gameForm) sgs.push(ss.gameForm);
score.forEach((dta) => console.log(JSON.stringify(dta)));
data.forEach((dta) => console.log(JSON.stringify(dta)));
sgs.forEach((dta) => console.log(JSON.stringify(dta)));

//1gz19P7z-6qblKNt5ey8kibeBjWBwtKkMzDtrg4Xyk1U
//GET https://www.googleapis.com/drive/v2/files/{fileId}/export