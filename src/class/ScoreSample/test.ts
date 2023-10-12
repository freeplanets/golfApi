import * as fs from 'fs';
import GameScore from './GameScore';

let gs:GameScore;

function readfile() {
	const text = fs.readFileSync('./data/unitest_sample.csv', 'utf8').split('\r\n');
	text.every((itm) => {
		const dta = itm.split(',');
		if (dta[0]){
			console.log(dta.join(","));
			if (dta[0] === 'player/game name') {
				gs = new GameScore();
			} else {
				if (!dta[4]) return false;
				if (gs) gs.assignData(dta);
			}
			return true;
		} else {
			return false;
		}
	});
	if (gs) gs.showData();
}

readfile();