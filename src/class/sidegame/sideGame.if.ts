import { player, playerDefault, playerGameData, sideGame } from "src/database/db.interface";

export interface sideGameCreate {
	create():sideGame;
}

interface sideGameConstructor {
	new(sideG:sideGame, playDfs:playerDefault[], players:player[]): sideGameCreate;
}
declare const sideGameCreate: sideGameConstructor;

export interface createPlayerGameData {
	create(sideG:sideGame):playerGameData[];
}

export interface hcpAssign {
	assign(p:player[]):void;
}