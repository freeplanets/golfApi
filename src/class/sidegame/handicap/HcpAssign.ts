import { games, playerDefault, playerGameData, score, sideGame } from "../../../database/db.interface";
// import { hcpAssign } from "../sideGame.if";
import { HcpType } from "../../../models/enum";
import { AnyObject } from "../../../models/if";

export default class HcpAssign {
	private sampleHcps = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	private holesOrder = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	constructor(private sideG:sideGame, private game:Partial<games>, private startHoleNo:number){
		switch(sideG.hcpType){
			case HcpType.NoHcp:
				sideG.playerGameData.forEach((itm) => itm.hcp = '0');
				break;
			case HcpType.FullHcp:
				console.log('FullHcp');
				sideG.playerGameData.forEach((itm) => {
					const f = this.game.playerDefaults.find((player) => player.playerName === itm.playerName);
					if (f) {
						itm.hcp = f.hcp;
					}
				});
				break;
			case HcpType.HcpDiff:
				sideG = this.hcpDiff(sideG, this.game.playerDefaults);
			//case HcpType.Handicap:
		}		
	}
	doit(): playerGameData[] {
		return this.sideG.playerGameData.map((pg)=> {
			if (pg.selected) {
				if (!pg.extraInfo) pg.extraInfo = {};
				let hcpRound = true;
				const fpd = this.game.playerDefaults.find((pd) => pd.playerName === pg.playerName);
				if (fpd) hcpRound = fpd.hcpRound;
				const f = this.game.players.find((p) => p.playerName === pg.playerName);
				if (f) {
					if (hcpRound) {
						pg.extraInfo.hcp = this.assignFromHardest(pg.hcp, f.holes);
					} else {
						pg.extraInfo.hcp = this.assignFromOrders(pg.hcp, f.holes);	
					}
					pg.extraInfo.order = this.holesOrder;
					// console.log('check hcp', pg.playerName, pg.hcp, pg.extraInfo.hcp);					
				}
			}
			return pg;
		})
	}

	private hcpDiff(sideG:sideGame, playDfs:playerDefault[]) {
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
	private sideGameHolesOrder(holes:score[]){
		if (this.holesOrder[0] > 0) return;
		// const f = holes.find((itm) => itm.zoneid === this.game.stepInZone && itm.fairwayno === this.game.stepInFairway);
		// if (f) {
			//let idx = f.holeNo - 1;
			let idx = this.startHoleNo - 1;
			for(let i = 0, n = this.holesOrder.length; i < n; i += 1) {
				this.holesOrder[idx] = i + 1;
				idx+=1;
				if (idx === n) idx = 0;
			}
		//}
	}
	private assignFromHardest(hcp:string, holes: score[]){
		this.sideGameHolesOrder(holes);
		const hcps = [...this.sampleHcps];
		// console.log('assignFromHardest', hcp, hcps);
		let hardstart = 1;
		let ihcp = parseInt(hcp, 10);
		for (let i=0, n=hcps.length; i <n; i+=1) {
			if (ihcp === 0) break;
			// console.log(i, ihcp, hardstart);
			const founds = holes.filter((itm) => itm.handicap === hardstart);
			// console.log('founds', founds.map((f) => f.holeNo));
			founds.every((score) => {
				if (ihcp > 0) {
					hcps[score.holeNo-1] -= 1;
					ihcp -= 1;
				} else {
					hcps[score.holeNo-1] += 1;
					ihcp += 1;
				}
				// console.log('holeNo', score.holeNo, ihcp);
				if (ihcp === 0) return false;
				return true;
			})
			hardstart+=1;
			if (hardstart>9) hardstart = 1;
		}
		return hcps;
	}
	private assignFromOrders(hcp:string, holes:score[]){
		this.sideGameHolesOrder(holes);
		// console.log('assignFromOrders', hcp);
		const hcps = [ ...this.sampleHcps ];
		const f = holes.find((itm) => itm.zoneid === this.game.stepInZone && itm.fairwayno === this.game.stepInFairway);
		if (f) {
			let ihcp = parseInt(hcp, 10);
			let no = f.holeNo;
			while(ihcp !==0) {
				if (ihcp > 0) {
					hcps[no-1] -= 1;
					ihcp -= 1;
				} else {
					hcps[no-1] += 1;
					ihcp += 1;
				}
				no += 1;
			}
		}
		return hcps;
	}
}