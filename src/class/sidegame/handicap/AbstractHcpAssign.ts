import { player, playerDefault, sideGame } from "../../../database/db.interface";
import { hcpAssign } from "../sideGame.if";
import { HcpType } from "../../../models/enum";
import { AnyObject } from "src/models/if";

export default abstract class AbstractHcpAssign implements hcpAssign {
	constructor(protected sideG:sideGame, protected playerDfs:playerDefault[]){
		switch(sideG.hcpType){
			case HcpType.NoHcp:
				sideG.playerGameData.forEach((itm) => itm.hcp = '0');
				break;
			case HcpType.FullHcp:
				sideG.playerGameData.forEach((itm) => {
					const f = playerDfs.find((player) => player.playerName === itm.playerName);
					if (f) {
						itm.hcp = f.hcp;
					}
				});
				break;
			case HcpType.HcpDiff:
				sideG = this.hcpDiff(sideG, playerDfs);
			//case HcpType.Handicap:
		}		
	}

	abstract assign(p: player[]): void;

	hcpDiff(sideG:sideGame, playDfs:playerDefault[]) {
		const ary:AnyObject[] = playDfs.map((itm) => {
			return {
				playerName: itm.playerName,
				hcp: parseInt(itm.hcp, 10),
			}
		});
		ary.sort((a:AnyObject, b:AnyObject) => a.hcp - b.hcp);
		for(let i=1; i<ary.length - 1; i++) {
			ary[i].hcp = ary[i].hcp - ary[0].hcp;
		}
		ary[0].hcp = 0;
		sideG.playerGameData.forEach((itm) => {
			const f = ary.find((aa) => aa.playerName === itm.playerName);
			if (f) {
				itm.hcp = String(f.hcp);
			}
		});
		return sideG;
	}
}