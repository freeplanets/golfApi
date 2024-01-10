import { carts, games, mapLatLong, zones } from "../database/db.interface";

export interface AnyObject {
  modifyid?:string;
  memberId?:string;
  checkInId?:string;
  player_id?:string;
  team?:string;
  team_id?:string;
  group_no?:string;
  [key:string]: any;
}

export interface errObj {
  message: string;
  extra?: AnyObject;
}

export interface commonRes {
  errcode:string;
  error?:errObj;
}

export interface commonResWithData<D> extends commonRes {
  data?:D;
}

// for game search
export interface siteDateReq {
  siteid: string;
  queryDate: string;
  status?: number;
}

// for game result search
export interface gameResultReq {
  siteid:string;
  dateStart:string;
  dateEnd:string;
  playerName?:string;
  gameTitle?:string;
  playedHoles?:number;
}

// game result
export interface gameResult {
  gameid?:string;
  date?:number;
  courseName?:string;
  team?:string;  // gameTitle
}
// game result for search playername
export interface gameResultPlayer extends gameResult {
  memberID?:string;
  playerName:string;
  gross:number;
  hcp?:string;
  net?:number;
  playedHoles?:number;
}
// game result for search date range only or gameTitle
export interface gameResultGroup extends gameResult {
  player: gameResultPlayer[]
}

export interface positonReq {
  // cartid:string; // 球車代號	TRUE
  zoneid?:string; // 分區代號
  fairwayno:number; //球道代號	TRUE
  location:mapLatLong; // 經緯度物件	TRUE																				
  distance?:number; // 離發球區距離
  cartName?:string; // for response
}

export interface checkInRes {
	game: games,
	zones: zones[],
	cart: carts,
}

export interface locReq extends mapLatLong {
  zoneid?:string;
  fairwayno?:number;
  distance?:number;
  siteid?:string;
  requestZoneid?:string;
  requestFairwayno?:number;
}

export interface gamesInfo {
  waitForCart: number;
  onGame: number;
  ended: number;
  total: number;  
}