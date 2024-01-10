import { sideGame } from "../../database/db.interface";
import Skin from "./Skin";

/**
 * 比洞賽 (Matchplay)
每洞的淨桿數最低者獲勝。該洞無最低桿時，不予計分。
可以根據球員差點之間的差異，依讓分規則計算。
 */
export default class Matchplay extends Skin {
	constructor(sg:sideGame) {
		super(sg);
	}
}