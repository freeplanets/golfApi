export interface caddie {
  number: string;
}
export interface zone {
  number: number;
}
export interface tee {
  name: string;
}
export interface InDataExtra {
  memberId: string;
  checkInId: string;
}
export interface player {
  name:string;
  tee: tee;
  extra: InDataExtra
}
export interface InDataTw01 {
  caddie: caddie;
  caddie2?: caddie;
	zones: zone[];
	players: player[];
	teeOffTimestamp: number;
}