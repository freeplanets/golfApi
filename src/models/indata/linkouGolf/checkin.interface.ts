import { AnyObject } from "src/models/if";

export interface caddie {
  number: string;
}
export interface zone {
  number: number;
}
export interface tee {
  name: string;
}
export interface checkinExtra extends AnyObject {
  memberId: string;
  checkInId: string;
}
export interface player {
  name:string;
  tee: tee;
  extra: checkinExtra;
}
export interface checkinLinkouGolf {
  caddie: caddie;
  caddie2?: caddie;
	zones: zone[];
	players: player[];
	teeOffTimestamp: number;
}