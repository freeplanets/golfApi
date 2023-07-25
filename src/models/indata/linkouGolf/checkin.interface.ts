export interface caddie {
  number: string;
}
export interface zones {
  number: number;
}
export interface tee {
  name: string;
}
export interface checkinExtra {
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
	zones: zones[];
	players: player[];
	teeOffTimestamp: number;
}