import { ksPlayer, ksScore } from "../ks.interface";

export default class _ksScore implements ksScore {
	player: ksPlayer;
	shots: number[];
}