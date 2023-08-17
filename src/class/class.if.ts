import { playerGameData, sideGame } from "../database/db.interface";

export interface createPlayerGameData {
	create(): playerGameData[];
}
export interface sideGameCreate {
	create(): sideGame;
}